import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BiArrowBack } from 'react-icons/bi';

const Create = ({ getWriting }) => {
  let navigate = useNavigate();
  const [writingId, setWritingId] = useState(1);
  const CreateContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    width: 100%;
    padding: 10px;
  `;
  const CreateTitleInput = styled.input`
    width: 1200px;
    height: 300px;
    font-size: 50px;
    border: none;
    outline: none;
    padding: 10px;
  `;

  const CreateTextArea = styled.textarea`
    width: 1200px;
    height: 300px;
    padding: 10px;
    font-size: 30px;
    border: none;
    outline: none;
  `;
  const CreateButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    width: 100%;
    height: 50px;
  `;

  const CreateBackButton = styled.button`
    background: white;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    outline: none;
    padding: 0px 1.25rem;
    text-align: center;
    width: 100px;
    height: 30px;
    margin-left: 10px;
    :hover {
      background-color: #f4f4f4;
    }
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;
      text-decoration: none;
      color: black;
    }
  `;

  const CreateSubmitButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 30px;
    border-radius: 4px;
    text-align: center;
    color: #f4f4f4;
    border: none;
    background-color: #05b388;
    font-weight: bold;
    cursor: pointer;
    padding: 0px 1.25rem;
    margin-right: 10px;
  `;

  const onSubmitWriting = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let data = {
      id: writingId,
      title: e.target[0].value,
      content: e.target[1].value,
      date: new Date().toLocaleString(),
    };
    setWritingId(writingId + 1);
    getWriting(data);
    navigate('/');
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
        <CreateButtonContainer>
          <CreateBackButton>
            <Link to="/">
              <BiArrowBack />
              <p>나가기</p>
            </Link>
          </CreateBackButton>
          {/* <CreateSubmitButton>
            <Link to="/">글작성</Link>
          </CreateSubmitButton> */}
          <CreateSubmitButton>글작성</CreateSubmitButton>
        </CreateButtonContainer>
      </form>
    </CreateContainer>
  );
};

export default Create;
