import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const Create = ({ getWriting }) => {
  const [writingId, setWritingId] = useState(1);
  const CreateContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `;
  const CreateTitleInput = styled.input`
    width: 400px;
    height: 30px;
  `;

  const CreateTextArea = styled.textarea`
    width: 400px;
    height: 300px;
    padding: 1px;
  `;
  const CreateSubmitButton = styled.button`
    width: 400px;
    height: 30px;
    text-align: center;
  `;

  const onSubmitWriting = (e) => {
    e.preventDefault();
    let data = {
      id: writingId,
      title: e.target[0].value,
      content: e.target[1].value,
      date: new Date().toLocaleString(),
    };
    setWritingId(writingId + 1);
    getWriting(data);
  };
  return (
    // 글작성 후 글목록으로 넘겨야하는 부분 수정 필요
    <CreateContainer>
      <form onSubmit={(e) => onSubmitWriting(e)}>
        <CreateTitleInput type="text" placeholder="제목" />
        <br />
        <CreateTextArea
          placeholder="당신의 이야기를 적어보세요..."
          rows="5"
          cols="33"
        />
        <br />
        {/* <Link
          data={data}
          to={{
            pathname: '/',
            state: data,
          }}
        >
          <CreateSubmitButton>글작성</CreateSubmitButton>
        </Link> */}
        <CreateSubmitButton>글작성</CreateSubmitButton>
      </form>
    </CreateContainer>
  );
};

export default Create;
