import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

const BlogContent = ({ content, setContent }) => {
    const handleEditorChange = (newContent) => {
        setContent(newContent);
    };

    const handleKeyUp = (event) => {
        const editor = window.tinymce.activeEditor;
        if (editor) {
            const currentContent = editor.getContent({ format: 'string' });
            const lastElement = currentContent.split(/<a [^>]*>(.*?)<\/a>/g).pop().trim();
            if (event.key === ' ' && lastElement && lastElement.startsWith('http')) {
                const newContent = currentContent + '<p></p>';
                setContent(newContent);
                editor.setContent(newContent);
            }
        }
    };

    return (
        <Editor
            apiKey="p99nugh3tyiff71l8ilanmw8ac45kj4ww4urafb83wjpe2ph"
            initialValue="" // Start with an empty string
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
                link_default_target: "_blank",
            }}
            onEditorChange={handleEditorChange}
            onKeyUp={handleKeyUp}
            className="border border-blue-300 rounded-lg shadow-lg"
        />
    );
};

export default BlogContent;
