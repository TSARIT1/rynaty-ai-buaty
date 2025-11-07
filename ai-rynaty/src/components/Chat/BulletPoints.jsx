// const BulletPoints = ({ text }) => {
//   const bulletRegex = /^\s*[\-•*]\s+/gm;
//   const lines = text.split('\n');
//   let inList = false;

//   const highlightRynaty = (content) => {
//     if (!content) return content;
//     return content.replace(/\bRynaty\b/g, '<span class="highlight-rynaty">Rynaty</span>');
//   };

//   return (
//     <div className="text-content">
//       {lines.map((line, i) => {
//         const isBullet = bulletRegex.test(line);
//         const content = isBullet ? line.replace(bulletRegex, '') : line;
//         const highlightedContent = highlightRynaty(content);

//         if (isBullet && !inList) {
//           inList = true;
//           return (
//             <ul key={i} className="bullet-list">
//               <li dangerouslySetInnerHTML={{ __html: highlightedContent }} />
//             </ul>
//           );
//         } else if (isBullet && inList) {
//           return <li key={i} dangerouslySetInnerHTML={{ __html: highlightedContent }} />;
//         } else if (!isBullet && inList) {
//           inList = false;
//           return <p key={i} dangerouslySetInnerHTML={{ __html: highlightedContent }} />;
//         } else {
//           return <p key={i} dangerouslySetInnerHTML={{ __html: highlightedContent || '<br />' }} />;
//         }
//       })}
//     </div>
//   );
// };

// export default BulletPoints;


import { FiCopy } from 'react-icons/fi';
import { Highlight } from 'prism-react-renderer';

const BulletPoints = ({ text }) => {
  // Regex patterns
  const bulletRegex = /^(\s*)[-•*]\s+/;
  const boldRegex = /\*\*(.*?)\*\*/g;
  const codeBlockRegex = /```(\w*)([\s\S]*?)```/g;
  
  // First process the entire text for code blocks
  const processText = (input) => {
    let processed = input;
    const codeBlocks = [];
    
    // Extract and replace code blocks with placeholders
    processed = processed.replace(codeBlockRegex, (match, p1, p2) => {
      const id = `CODEBLOCK_${codeBlocks.length}`;
      codeBlocks.push({
        id,
        language: p1 || 'javascript',
        code: p2.trim()
      });
      return id;
    });

    // Process bold text
    processed = processed.replace(boldRegex, '<strong>$1</strong>');
    
    // Highlight Rynaty
    processed = processed.replace(/\bRynaty\b/g, '<span class="highlight-rynaty">Rynaty</span>');

    return { processed, codeBlocks };
  };

  const { processed: processedText, codeBlocks } = processText(text);
  const lines = processedText.split('\n');
  let inList = false;

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    // Add toast notification here if needed
  };

  return (
    <div className="text-content">
      {lines.map((line, i) => {
        // Check if this line is a code block placeholder
        const codeBlockMatch = line.match(/CODEBLOCK_(\d+)/);
        if (codeBlockMatch) {
          const block = codeBlocks[parseInt(codeBlockMatch[1])];
          return (
            <div key={`code-${i}`} className="code-block-wrapper">
              <div className="code-header">
                <span>{block.language}</span>
                <button 
                  onClick={() => handleCopy(block.code)}
                  className="copy-button"
                  title="Copy to clipboard"
                >
                  <FiCopy size={14} />
                </button>
              </div>
              <Highlight code={block.code} language={block.language}>
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
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
                )}
              </Highlight>
            </div>
          );
        }

        // Process regular content
        const isBullet = bulletRegex.test(line);
        const content = isBullet ? line.replace(bulletRegex, '') : line;

        if (isBullet && !inList) {
          inList = true;
          return (
            <ul key={i} className="bullet-list">
              <li dangerouslySetInnerHTML={{ __html: content }} />
            </ul>
          );
        } else if (isBullet && inList) {
          return <li key={i} dangerouslySetInnerHTML={{ __html: content }} />;
        } else if (!isBullet && inList) {
          inList = false;
          return (
            <>
              <br key={`br-${i}`} />
              <p key={i} dangerouslySetInnerHTML={{ __html: content }} />
            </>
          );
        } else {
          return <p key={i} dangerouslySetInnerHTML={{ __html: content || '&nbsp;' }} />;
        }
      })}
    </div>
  );
};

export default BulletPoints;