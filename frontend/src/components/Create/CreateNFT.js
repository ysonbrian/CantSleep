import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IconContext } from 'react-icons';
import { MdOutlineImage } from 'react-icons/md';
const CreateNFT = () => {
  let navigate = useNavigate();
  const [files, setFiles] = useState('');
  const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    margin-top: 40px;
  `;
  const Title = styled.div`
    line-height: 110%;
    font-weight: 600;
    font-size: 40px;
    letter-spacing: 0px;
    margin-bottom: 20px;
  `;

  const InputImage = styled.input`
    display: none;
  `;
  const InputTemp = styled.div`
    border-radius: 10px;
    border: 3px dashed rgb(127, 117, 117);
  `;
  const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
    border-radius: 10px;
    padding: 20px;
    height: 257px;
    width: 350px;
    :hover {
      background-color: rgb(226, 224, 224);
    }
  `;

  const InputInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    gap: 10px;
    letter-spacing: 2px;
    color: rgb(33, 29, 29);
  `;

  const InputInfo = styled.input`
    border: none;
    outline: none;
    height: 48px;
    padding-left: 10px;
    min-width: 0px;
    border-radius: 10px;
    background-color: rgb(229, 224, 224);
    :hover {
      background-color: rgb(211, 208, 208);
    }
    :focus {
      background-color: rgb(211, 208, 208);
    }
    ::placeholder {
      color: #ffffff;
    }
  `;

  const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    height: 100px;
    margin-top: 20px;
    gap: 20px;
  `;

  const SubmitButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 40px;
    border-radius: 6px;
    text-align: center;
    color: #f4f4f4;
    border: none;
    background-color: #05b388;
    font-weight: bold;
    cursor: pointer;
    padding: 0px 1.25rem;
    margin-right: 10px;
    letter-spacing: 2px;
    :hover {
      opacity: 0.7;
    }
  `;

  const onSubmitNft = (e) => {
    e.preventDefault();
    console.log('Hi');
    navigate('/');
  };

  const onHandleChange = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], 'UTF');
    fileReader.onload = (e) => {
      console.log(e.target.result);
      setFiles(e.target.result);
    };
  };

  return (
    <Container>
      <form onSubmit={(e) => onSubmitNft(e)}>
        <Title>상품 등록</Title>
        <InputImage id="fileUpload" type="file" onChange={onHandleChange} />
        <label htmlFor="fileUpload">
          <InputTemp>
            <ImageContainer>
              <IconContext.Provider
                value={{ color: 'rgb(204, 204, 204) ', outline: 'none' }}
              >
                <div>
                  <MdOutlineImage size={70} />
                </div>
              </IconContext.Provider>
            </ImageContainer>
          </InputTemp>
        </label>
        <InputInfoContainer>
          <label htmlFor="inputName">이름</label>
          <InputInfo id="inputName" placeholder="아이템 이름" />
        </InputInfoContainer>
        <InputInfoContainer>
          <label htmlFor="inputName">정보</label>
          <InputInfo
            id="inputName"
            placeholder="선택한 아이템의 정보를 입력 해주세요"
          />
        </InputInfoContainer>
        <ButtonContainer>
          <hr />
          <SubmitButton>제출</SubmitButton>
        </ButtonContainer>
      </form>
    </Container>
  );
};

export default CreateNFT;
