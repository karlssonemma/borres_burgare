import styled from 'styled-components';
import theme from '../../utils/theme';

export const StyledForm = styled.form`
    width: max-content;
    height: max-content;
    margin-top: 1em;
    padding: 2em;
    border-radius: 10px;
    background-color: ${props => props.theme.colors.lightorange};
    display: flex;
    flex-direction: column;
`;