import PropTypes from 'prop-types';
import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import ReactQuill from 'react-quill';
// @mui
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
//
import EditorToolbar, { formats } from './EditorToolbar';
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const RootStyle = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.grey[500_32]}`,
  '& .ql-container.ql-snow': {
    borderColor: 'transparent',
    ...theme.typography.body1,
    fontFamily: theme.typography.fontFamily,
  },
  '& .ql-editor': {
    minHeight: 200,
    '&.ql-blank::before': {
      fontStyle: 'normal',
      color: theme.palette.text.disabled,
    },
    '& pre.ql-syntax': {
      ...theme.typography.body2,
      padding: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.grey[900],
    },
  },
}));

// ----------------------------------------------------------------------
Editor.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.node,
  simple: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Editor({
  id = 'minimal-quill',
  error,
  value,
  onChange,
  simple = false,
  helperText,
  sx,
  ...other
}) {

  const QuillRef = useRef();

  const [url, seturl] = useState();

  const imageDiv = useCallback(() => {
    const range = QuillRef.current?.getEditor().getSelection()?.index;
    if (range !== null && range !== undefined) {
      const quill = QuillRef.current?.getEditor();

      quill?.setSelection(range, 1);

      quill?.clipboard.dangerouslyPasteHTML(
        range,
        `<img src=${url} alt=${url} />`
      );
    }
  }, [url])

  const imageHandler = () => {
    const accessToken = window.localStorage.getItem('accessToken');

    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', '*/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('imageFile', file);
      if (file !== null) {
        try {
        const response = await axios.post('/api/s3/image', formData, {
            headers: {
              'content-type': 'multipart/form-data',
              Authorization: accessToken,
            },
          });

          seturl(response.data.data)
              
          // const editor = QuillRef.current.getEditor(); 

          // const range = editor.getSelection();

          // editor.insertEmbed(range.index, 'image', `${imgurl}`); 
          imageDiv() 
        } 
        catch (error) {
          const err = error;
          return { ...err.response, success: false };
        }
      }
      return '';
    };
  };


  useEffect(() => {
    imageDiv()
  }, [imageDiv, url])


  const modules = useMemo(() => {
    const module = {
    toolbar: {
      container: `#${id}`,
      handlers: {
        image: imageHandler,
        link: ''
      },
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true,
    },
    }
    return module
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <RootStyle
        sx={{
          ...(error && {
            border: (theme) => `solid 1px ${theme.palette.error.main}`,
          }),
          ...sx,
        }}
      >
        <EditorToolbar id={id} isSimple={simple} />
        <ReactQuill
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder="글을 입력해주세요."
          {...other}
        />
      </RootStyle>

      {helperText && helperText}
    </div>
  );
}
