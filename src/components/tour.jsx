import { closeTour } from "../pages/Main/homepage"

export const tourConfig = [
  {
    selector: ".metaacct",
    content: `This is your Meta Mask Account you are currently using. Please make sure you verify your account before making transaction.`,
  },
  {
    selector: ".form-field",
    content: `Enter the amount you would like to borrow, repay on a loan, make a deposit, widthdraw or donate.`,
  },
  {
    selector: "#cusSelectbox",
    content: `Find the token you want to handle here. Keep in mind once you select the button the transaction will begin.`,
  },
  {
    selector: ".walletActions",
    content:
      "Here is where the action is. You can borrow from the liquidity pool, repay a loan, deposit to the liquidity pool, withdraw your funds, or donate to Colbalt. ",
  },
  {
    selector: "#balanceNumber",
    content: "Visibility is important, monitor your balance of your selected token.",
  },
  {
    selector: "#contractAddress",
    content: () => (
      <div>
        Add the token of your choice straight into your Meta Mask wallet with a click
        of the button.
        <br /> "Think you got it now?"{" "}
        <button
          style={{
            border: "1px solid #f7f7f7",
            background: "none",
            padding: ".3em .7em",
            fontSize: "inherit",
            display: "block",
            cursor: "pointer",
            margin: "1em auto",
          }}
          onClick={() =>
            (closeTour = () => {
              this.setState({ isTourOpen: false })
            })
          }
        >
          Let's Begin{" "}
          <span aria-label="bus" role="img">
            💲
          </span>
        </button>
      </div>
    ),
  },
]
