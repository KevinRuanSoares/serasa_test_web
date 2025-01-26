// src/pages/FarmCreate/styledForm.ts
import styled from "styled-components";

export const FormContainer = styled.div`
  // max-width: 500px;
  margin: 0 auto;
  padding: 30px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

export const FormTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

export const FormField = styled.div`
  margin-bottom: 20px;
`;

export const FormLabel = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 12px 15px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #f9f9f9;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #28a745;
    background: #fff;
  }

  &::placeholder {
    color: #aaa;
  }
`;