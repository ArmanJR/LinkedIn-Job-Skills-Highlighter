// ==UserScript==
// @name         LinkedIn Job Skills Highlighter
// @namespace    http://github.com/ArmanJR
// @version      1.0
// @description  Highlight skills in LinkedIn job postings with color groups
// @author       Arman JR.
// @match        https://www.linkedin.com/jobs/*
// @grant        none
// @license MIT
// ==/UserScript==

(function() {
    'use strict';

    const skillsHighlight = {
        'strong': {
            color: '#0fe800', // green
            skills: ['go', 'golang', 'java', 'spring', 'springboot']
        },
        'intermediate': {
            color: '#f5ed00', // yellow
            skills: ['javascript', 'mysql', 'api', 'shell', 'unix']
        },
        'weak': {
            color: '#ff7f6b', // red
            skills: ['typescript']
        }
    };

    let highlightCount = 0;
    let highlightInterval = null;

    function clickShowMoreButton() {
        const showMoreButton = document.querySelector('.feed-shared-inline-show-more-text__see-more-less-toggle');
        if (showMoreButton && showMoreButton.textContent.includes('show more')) {
            console.log('Found "Show more" button, clicking it...');
            showMoreButton.click();

            clearInterval(showMoreInterval);
            console.log('Starting keyword highlighting...');
            highlightInterval = setInterval(scanJobDescription, 2000);
        }
    }

    function scanJobDescription() {
        const contentDiv = document.querySelector('.feed-shared-inline-show-more-text');
        if (!contentDiv) {
            console.log('Content div not found, waiting...');
            return;
        }

        // Skip if content is already processed
        if (contentDiv.getAttribute('data-processed')) {
            return;
        }

        highlightCount = 0;

        // Get all text nodes within the content div
        const walker = document.createTreeWalker(
            contentDiv,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        const textNodes = [];
        let node;
        while (node = walker.nextNode()) {
            textNodes.push(node);
        }

        // Process each text node separately
        textNodes.forEach(textNode => {
            let content = textNode.textContent;
            let modified = false;

            for (const [level, group] of Object.entries(skillsHighlight)) {
                for (const skill of group.skills) {
                    const regex = new RegExp(`\\b${skill}\\b`, 'gi');
                    const matches = content.match(regex);

                    if (matches) {
                        highlightCount += matches.length;
                        content = content.replace(
                            regex,
                            `<span style="background-color: ${group.color}; padding: 0 2px; border-radius: 2px; font-size: 1.1em; font-weight: 500;">$&</span>`
                        );
                        modified = true;
                    }
                }
            }

            if (modified) {
                const span = document.createElement('span');
                span.innerHTML = content;
                textNode.parentNode.replaceChild(span, textNode);
            }
        });

        contentDiv.setAttribute('data-processed', 'true');
        console.log(`Highlighted ${highlightCount} keywords in job description`);
    }

    // Start looking for the "show more" button
    const showMoreInterval = setInterval(clickShowMoreButton, 1000);

    // Reset when URL changes (new job selected)
    let lastUrl = location.href;
    new MutationObserver(() => {
        if (location.href !== lastUrl) {
            lastUrl = location.href;
            if (highlightInterval) {
                clearInterval(highlightInterval);
                highlightInterval = null;
            }
            const showMoreInterval = setInterval(clickShowMoreButton, 1000);
        }
    }).observe(document, {subtree: true, childList: true});
})();
