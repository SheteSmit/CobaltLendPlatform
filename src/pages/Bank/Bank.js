import styled from "styled-components"
import { useForm } from "react-hook-form"
import { Button, TextField } from "@material-ui/core"

export default function Bank() {
  const { register, handleSubmit } = useForm()
  async function submit(data) {
    switch (data.action) {
      case "deposit": {
        break
      }
      case "withdraw": {
        break
      }
      default:
        return
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <SpaceAroundRow>
          <Button variant="outlined">Scoring Token</Button>
          <Spacer />
          Cobalt Lend
          <Spacer />
          <Button variant="outlined">Connect Wallet</Button>
        </SpaceAroundRow>
        <SpaceAroundRow>
          <Col>
            <TextField
              variant="outlined"
              disabled
              label="Balance"
              defaultValue="10"
              size="small"
            />
            <TextField
              variant="outlined"
              disabled
              label="Staking Rewards"
              defaultValue="10"
              size="small"
            />
            <TextField
              variant="outlined"
              disabled
              label="Outstand Loans"
              defaultValue="10"
              size="small"
            />
            <TextField
              variant="outlined"
              disabled
              label="Loan Proposals Pending"
              defaultValue="10"
              size="small"
            />
          </Col>
          <img src="CobaltLogo.jpg" style={{ width: "30%" }} alt="logo" />
          <Col>
            <TextField
              variant="outlined"
              disabled
              label="Loan Status"
              defaultValue="10"
              size="small"
            />
            <TextField
              variant="outlined"
              disabled
              label="Outstanding Loan Status"
              defaultValue="10"
              size="small"
            />
          </Col>
        </SpaceAroundRow>
        <SpaceAroundRow></SpaceAroundRow>
        <input
          className="form-input"
          type="number"
          placeholder="0.0"
          {...register("amount")}
        />
        <select {...register("action")}>
          <option value="withdraw">Withdraw</option>
          <option value="deposit">Deposit</option>
        </select>
      </form>
    </>
  )
}

const SpaceAroundRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 2% 0 2% 0;
`

// const CenterRow = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
// `;

const Spacer = styled.div`
  display: inline-block;
  width: 1px;
`

const Col = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
