"use client";

import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

interface CKEditorWrapperProps {
  data: string;
  onChange: (data: string) => void;
}

export default function CKEditorWrapper({ data, onChange }: CKEditorWrapperProps) {
  return (
    <CKEditor
      editor={ClassicEditor as any}
      data={data}
      config={{
        toolbar: [
          'heading',
          '|',
          'bold',
          'italic',
          'link',
          'bulletedList',
          'numberedList',
          '|',
          'outdent',
          'indent',
          '|',
          'imageUpload',
          'blockQuote',
          'insertTable',
          'mediaEmbed',
          'undo',
          'redo'
        ],
        language: 'vi',
        placeholder: 'Nhập nội dung tin tức...'
      }}
      onChange={(event: any, editor: any) => {
        const data = editor.getData();
        onChange(data);
      }}
    />
  );
} 