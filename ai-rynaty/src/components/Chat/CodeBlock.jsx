import React, { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import { Highlight } from 'prism-react-renderer';

const CodeBlock = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Highlight code={code} language={language || 'javascript'}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div className="code-block-wrapper">
          <div className="code-header">
            <span>{language || 'javascript'}</span>
            <button 
              onClick={handleCopy}
              className="copy-button"
              title="Copy to clipboard"
            >
              <FiCopy size={14} />
              {copied && <span className="copied-text">Copied!</span>}
            </button>
          </div>
          <pre className={className} style={style}>
            <code>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                  <span className="line-number">{i + 1}</span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </code>
          </pre>
        </div>
      )}
    </Highlight>
  );
};

export default CodeBlock;