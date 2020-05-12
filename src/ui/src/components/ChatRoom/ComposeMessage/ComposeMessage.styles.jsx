import styled from 'styled-components'

export const ComposeForm = styled.form`
  display: flex;
  flex-grow: 1;
  margin-right: 16px;
`
ComposeForm.displayName = 'ComposeForm'

export const ComposeInput = styled.input`
  border: 1px solid #eeeeee;
  width: 100%;
  padding: 12px;
  margin: 0 16px 0 0;
  flex-grow: 1;
`
ComposeInput.displayName = 'ComposeInput'

export const ComposeButton = styled.button`
  font-size: 14px;
`
ComposeButton.displayName = 'ComposeButton'
