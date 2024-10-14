import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

const BlogContent = ({ content, setContent }) => {
    const handleEditorChange = (newContent) => {
        setContent(newContent);
    };

    const handleKeyUp = (event) => {
        // Use the TinyMCE API to get the current content
        const editor = window.tinymce.activeEditor;

        // Ensure the editor is available
        if (editor) {
            const content = editor.getContent({ format: 'string' });
            const lastElement = content.split(/<a [^>]*>(.*?)<\/a>/g).pop().trim();

            if (event.key === ' ' && lastElement && lastElement.startsWith('http')) {
                // Insert a paragraph if the last element is a link followed by a space
                const newContent = content + '<p></p>';
                setContent(newContent);
                editor.setContent(newContent); // Use the TinyMCE API to set content
            }
        }
    };

    return (
        <Editor
            apiKey="p99nugh3tyiff71l8ilanmw8ac45kj4ww4urafb83wjpe2ph"
            initialValue=" "
            init={{
                height: 400,
                menubar: false,
                plugins: [
                    'link',
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                ],
                toolbar:
                    'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | ' +
                    'bullist numlist outdent indent | link image | code ',
                link_default_target: "_blank", // Open links in a new tab
            }}
            onEditorChange={handleEditorChange}
            onKeyUp={handleKeyUp}
            className="border border-blue-300 rounded-lg shadow-lg"
        />
    );
};

export default BlogContent;
