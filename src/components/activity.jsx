import React from "react"

const Activity = () => {
  return (
    <>
      <div class="card">
        <div class="card-header border-0 py-0">
          <h4 class="card-title">Recent Activities</h4>
          <a href="/tradix_react/dashboard">View More </a>
        </div>
        <div class="card-body">
          <div class="transaction-table">
            <div class="table-responsive">
              <table class="table mb-0 table-responsive-sm">
                <tbody>
                  <tr>
                    <td>
                      <span class="sold-thumb">
                        <i class="la la-arrow-down"></i>
                      </span>
                    </td>
                    <td>
                      <span class="badge badge-danger">Sold</span>
                    </td>
                    <td>
                      <i class="cc BTC"></i> Bitcoin
                    </td>
                    <td>Using - Bank *******5264</td>
                    <td class="text-danger">-0.000242 BTC</td>
                    <td>-0.125 USD</td>
                  </tr>
                  <tr>
                    <td>
                      <span class="buy-thumb">
                        <i class="la la-arrow-up"></i>
                      </span>
                    </td>
                    <td>
                      <span class="badge badge-success">Buy</span>
                    </td>
                    <td>
                      <i class="cc LTC"></i> Litecoin
                    </td>
                    <td>Using - Card *******8475</td>
                    <td class="text-success">-0.000242 BTC</td>
                    <td>-0.125 USD</td>
                  </tr>
                  <tr>
                    <td>
                      <span class="sold-thumb">
                        <i class="la la-arrow-down"></i>
                      </span>
                    </td>
                    <td>
                      <span class="badge badge-danger">Sold</span>
                    </td>
                    <td>
                      <i class="cc XRP"></i> Ripple
                    </td>
                    <td>Using - Card *******8475</td>
                    <td class="text-danger">-0.000242 BTC</td>
                    <td>-0.125 USD</td>
                  </tr>
                  <tr>
                    <td>
                      <span class="buy-thumb">
                        <i class="la la-arrow-up"></i>
                      </span>
                    </td>
                    <td>
                      <span class="badge badge-success">Buy</span>
                    </td>
                    <td>
                      <i class="cc DASH"></i> Dash
                    </td>
                    <td>Using - Card *******2321</td>
                    <td class="text-success">-0.000242 BTC</td>
                    <td>-0.125 USD</td>
                  </tr>
                  <tr>
                    <td>
                      <span class="sold-thumb">
                        <i class="la la-arrow-down"></i>
                      </span>
                    </td>
                    <td>
                      <span class="badge badge-danger">Sold</span>
                    </td>
                    <td>
                      <i class="cc BTC"></i> Bitcoin
                    </td>
                    <td>Using - Card *******2321</td>
                    <td class="text-danger">-0.000242 BTC</td>
                    <td>-0.125 USD</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Activity
