import styled from "styled-components"
import { Card, Avatar } from "@material-ui/core"

//Better for Wrapped Content
export const SpaceAroundRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 3% 0 3%;
  margin: 2% 0 2% 0;
`

export const StyledCard = styled(Card)`
  border-radius: 10px;
  flex-wrap: wrap;
  padding: 1% 2% 0 2%;
  font-size: 14px;
  color: #6b7774 !important;
  font-weight: 600;
  p {
    padding-top: 5%;
    color: black;
    font-size: 18px;
  }
`
export const StyledCardHeightFit = styled(Card)`
  border-radius: 10px;
  flex-wrap: wrap;
  padding: 1% 2% 0 2%;
  font-size: 14px;
  color: #6b7774 !important;
  font-weight: 600;
  height: fit-content;
  p {
    padding-top: 5%;
    color: black;
    font-size: 18px;
  }
`
export const Row = styled.div`
  display: flex;
  flex-direction: row;
`
export const Col = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1%;
`

export const StyledAvatar = styled(Avatar)`
  background-color: ${(props) => props.inputColor} !important;
`

export const Container = styled.div`
  // margin-top: 4%;
`

export const CobaltContainer = styled.div`
  display: flex;
  padding: 3%;
`

export const CobaltCard = styled(Card)`
  h3 {
    color: ${(props) => props.theme.grayText};
  }
  padding: 2%;
  width: 35%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`
