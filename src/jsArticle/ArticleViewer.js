import React, { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ArticleEditor } from "./index";
import "./ArticleViewer.css";

const ArticleViewer = () => {
    const [articles, setArticles] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const savedArticles = JSON.parse(
            localStorage.getItem("jsArticles") || "[]"
        );
        setArticles(savedArticles);
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const handleCopyCode = (code, index) => {
        navigator.clipboard.writeText(code);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleEditComplete = () => {
        setIsEditing(false);
        const savedArticles = JSON.parse(
            localStorage.getItem("jsArticles") || "[]"
        );
        setArticles(savedArticles);
    };

    const renderFormattedContent = (text, codeSnippets) => {
        return text.split("\n").map((line, index) => {
            if (line.startsWith("[code-snippet-")) {
                const snippetIndex = parseInt(line.match(/\d+/)[0]);
                if (snippetIndex < codeSnippets.length) {
                    return ( <
                        div key = { index }
                        className = "code-preview" >
                        <
                        div className = "code-header" >
                        <
                        span > JavaScript < /span>{" "} <
                        button className = "copy-btn"
                        onClick = {
                            () =>
                            handleCopyCode(codeSnippets[snippetIndex], snippetIndex)
                        } >
                        { " " } { copiedIndex === snippetIndex ? "Copied!" : "Copy" } { " " } <
                        /button>{" "} <
                        /div>{" "} <
                        SyntaxHighlighter language = "javascript"
                        style = { vscDarkPlus }
                        showLineNumbers = { true }
                        wrapLines = { true }
                        customStyle = {
                            {
                                backgroundColor: "#1E1E1E",
                                color: "#D4D4D4",
                                margin: "0",
                                borderRadius: "0 0 4px 4px",
                                fontSize: "14px",
                                padding: "16px",
                            }
                        } >
                        { " " } { codeSnippets[snippetIndex] } { " " } <
                        /SyntaxHighlighter>{" "} <
                        /div>
                    );
                }
                return null;
            }

            if (line.startsWith("# ")) {
                return <h1 key = { index } > { line.substring(2) } < /h1>;
            }
            if (line.startsWith("## ")) {
                return <h2 key = { index } > { line.substring(3) } < /h2>;
            }
            if (line.startsWith("### ")) {
                return <h3 key = { index } > { line.substring(4) } < /h3>;
            }

            if (line.startsWith("• ")) {
                return <li key = { index } > { line.substring(2) } < /li>;
            }

            const highlightRegex =
                /\[highlight=(#[a-fA-F0-9]{6})\](.*?)\[\/highlight\]/g;
            let parts = [];
            let lastIndex = 0;
            let match;

            while ((match = highlightRegex.exec(line)) !== null) {
                if (match.index > lastIndex) {
                    parts.push(line.substring(lastIndex, match.index));
                }
                parts.push( <
                    span key = { match.index }
                    style = {
                        { backgroundColor: match[1] } } > { " " } { match[2] } { " " } <
                    /span>
                );
                lastIndex = match.index + match[0].length;
            }

            if (lastIndex < line.length) {
                parts.push(line.substring(lastIndex));
            }

            if (parts.length === 0) {
                const boldRegex = /\*\*(.*?)\*\*/g;
                parts = line
                    .split(boldRegex)
                    .map((part, i) =>
                        i % 2 === 0 ? part : < strong key = { i } > { part } < /strong>
                    );
            }

            return <p key = { index } > { parts } < /p>;
        });
    };

    if (isEditing && selectedArticle) {
        return ( <
            ArticleEditor editMode = { true }
            article = { selectedArticle }
            onComplete = { handleEditComplete }
            />
        );
    }

    return ( <
        div className = "article-viewer" >
        <
        h2 > JavaScript Articles < /h2>{" "} <
        div className = "articles-container" >
        <
        div className = "articles-list" > { " " } {
            articles.map((article) => ( <
                div key = { article.id }
                className = { `article-item ${
                selectedArticle?.id === article.id ? "selected" : ""
              }` }
                onClick = {
                    () => {
                        setSelectedArticle(article);
                        setIsEditing(false);
                    }
                } >
                <
                h3 > { article.title } < /h3>{" "} <
                p className = "article-date" > { formatDate(article.createdAt) } < /p>{" "} {
                    article.lastEdited && ( <
                        p className = "edit-date" >
                        Edited: { formatDate(article.lastEdited) } { " " } <
                        /p>
                    )
                } { " " } <
                /div>
            ))
        } { " " } {
            articles.length === 0 && ( <
                p className = "no-articles" > { " " }
                No articles found.Start writing one!{ " " } <
                /p>
            )
        } { " " } <
        /div>{" "} {
            selectedArticle && ( <
                div className = "article-content" >
                <
                div className = "article-header" >
                <
                h2 > { selectedArticle.title } < /h2>{" "} <
                button onClick = { handleEdit }
                className = "edit-btn" >
                Edit Article { " " } <
                /button>{" "} <
                /div>{" "} <
                div className = "formatted-content" > { " " } {
                    renderFormattedContent(
                        selectedArticle.content,
                        selectedArticle.codeSnippets
                    )
                } { " " } <
                /div>{" "} <
                /div>
            )
        } { " " } <
        /div>{" "} <
        /div>
    );
};

export default ArticleViewer;