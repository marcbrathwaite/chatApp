import styled from 'styled-components'

export const Modal = styled.div`
  padding: 10px;
`
Modal.displayName = 'Modal'

export const InputLabel = styled.label`
  display: block;
  margin-bottom: 20px;
`
InputLabel.displayName = 'InputLabel'

export const InputContainer = styled.form`
  display: flex;
  height: 30px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`
InputContainer.displayName = 'InputContainer'

export const Input = styled.input`
  width: 80%;
  height: 100%;
  padding: 10px 5px;
  border: 1px solid #e1e1e1;
  border-radius: 5px;
`
Input.displayName = 'Input'

export const Button = styled.button`
  height: 100%;
  font-size: 1.2rem;
  border: 1px solid #e1e1e1;
  border-radius: 2px;
`
Button.displayName = 'Button'

export const ErrorMsg = styled.p`
  font-size: 1.2rem;
  color: red;
  margin-bottom: 5px;
`
ErrorMsg.displayName = 'ErrorMsg'
