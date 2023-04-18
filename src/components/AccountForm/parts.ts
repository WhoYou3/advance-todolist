import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: clamp(50px, 100%, 300px);
  aspect-ratio: 1/1.5;
  margin: 2rem;
  padding: 2rem;
  background-color: transparent;
  backdrop-filter: blur(10px);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.55);
  border-radius: 10px;

  h2 {
    font-size: 2rem;
    text-align: center;
    margin: 1rem;
  }
`;
export const Form = styled.form`
  button {
    width: 100%;
    height: 45px;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    font-size: 1rem;
    background-color: #635fc7;
  }

  p {
    margin-top: 1rem;
    font-size: 0.9rem;
    text-align: center;
    span {
      font-weight: bold;
      color: #635fc7;
      cursor: pointer;
      :hover {
        text-decoration: underline;
      }
    }
  }
`;

export const InputBox = styled.div`
  position: relative;
  border-bottom: 2px solid #162938;
  width: 100%;
  height: 50px;
  margin: 30px 0;

  svg {
    position: absolute;
    right: 8px;
    font-size: 1.3rem;
    top: 15px;
  }

  label {
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    pointer-events: none;
    transition: 0.5s;
  }

  input {
    width: 100%;
    height: 100%;
    background: transparent;
    font-weight: 600;
    font-size: 0.8rem;
    :focus ~ label,
    :valid ~ label {
      top: -10px;
    }
  }
`;
