import React from 'react';

function Total_transaction_graph() {
    return (
        <div>
            

            <section class="bg_bulk d-flex align-items-center">
  <div class="container">
    <div class="row text-center " data-aos="fade-down" data-aos-delay="400">
      <div class="col-lg-12 d-flex flex-column justify-content-center">
        <h1 data-aos="fade-up" class="aos-init aos-animate"><span><b>Total Transactions</b></span></h1>
        <p data-aos="fade-up" class="aos-init aos-animate"></p>
      </div>
    </div>
    <div class="row">
      <div class="path2" data-aos="fade-up" data-aos-delay="400">
        <Link to="search_transactions.php">Doard</Link> - <span>Total Transactions</span>
      </div>
    </div>
  </div>
</section>

<main id="main">
  <section class="organizationList pb-0 mt-3">
    <div class="container card-sm" data-aos="fade-down" data-aos-delay="600">
      <div class="section-title">
        <h1 class="mb-0">Transaction History List</h1>
      </div>
      <div class="row justify-content-center mt-4">
        <div class="col-lg-12">
          <div class="row">
            <div class="col-lg-12">
              <div class="table-responsive">
                <table id="exportexample" class="table text-center table-bordered border-t0 key-buttons text-nowrap w-100">
                  <thead>
                    <tr class="trans_th">
                      <th>Transaction date</th>
                      <th>PCN</th>
                      <th>Pay-in Cashier</th>
                      <th>Pay-out Cashier</th>
                      <th>Sender Name </th>
                      <th>Beneficiary Name </th>
                      <th>Relationship</th>
                      <th>Sending Amount</th>
                      <th>Receiver Amount</th>
                      <th>Status</th>
                      <th class="nosort">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Aug 17, 2021</td>
                      <td>CHR55441143</td>
                      <td>puny satavas</td>
                      <td></td>
                      <td>sumit</td>
                      <td>sumit</td>
                      <td></td>
                      <td>NGN 102.04</td>
                      <td>NGN 100.00 </td>
                      <td>Verifying</td>
                      <td>
                        <span class="justify-content-center d-flex w-100">
                          <Link to="search_transactions_detail" class="icon_btn" data-toggle="tooltip" title="" data-placement="left" data-original-title="View Detail" aria-describedby="tooltip871476"><i class="fe fe-eye  text-primary mr-2"></i>
                          </Link>
                        </span></td>
                    </tr>
                    <tr>
                      <td>Aug 17, 2021</td>
                      <td>CHR55441143</td>
                      <td>puny satavas</td>
                      <td></td>
                      <td>sumit</td>
                      <td>sumit</td>
                      <td></td>
                      <td>NGN 102.04</td>
                      <td>NGN 100.00 </td>
                      <td>Verifying</td>
                      <td>
                        <span class="justify-content-center d-flex w-100">
                          <Link to="search_transactions_detail" class="icon_btn" data-toggle="tooltip" title="" data-placement="left" data-original-title="View Detail" aria-describedby="tooltip871476"><i class="fe fe-eye  text-primary mr-2"></i>
                          </Link>
                        </span></td>
                    </tr>
                    <tr>
                      <td>Aug 17, 2021</td>
                      <td>CHR55441143</td>
                      <td>puny satavas</td>
                      <td></td>
                      <td>sumit</td>
                      <td>sumit</td>
                      <td></td>
                      <td>NGN 102.04</td>
                      <td>NGN 100.00 </td>
                      <td>Verifying</td>
                      <td>
                        <span class="justify-content-center d-flex w-100">
                          <Link to="search_transactions_detail" class="icon_btn" data-toggle="tooltip" title="" data-placement="left" data-original-title="View Detail" aria-describedby="tooltip871476"><i class="fe fe-eye  text-primary mr-2"></i>
                          </Link>
                        </span></td>
                    </tr>
                    <tr>
                      <td>Aug 17, 2021</td>
                      <td>CHR55441143</td>
                      <td>puny satavas</td>
                      <td></td>
                      <td>sumit</td>
                      <td>sumit</td>
                      <td></td>
                      <td>NGN 102.04</td>
                      <td>NGN 100.00 </td>
                      <td>Verifying</td>
                      <td>
                        <span class="justify-content-center d-flex w-100">
                          <Link to="search_transactions_detail" class="icon_btn" data-toggle="tooltip" title="" data-placement="left" data-original-title="View Detail" aria-describedby="tooltip871476"><i class="fe fe-eye  text-primary mr-2"></i>
                          </Link>
                        </span></td>
                    </tr>
                    <tr>
                      <td>Aug 17, 2021</td>
                      <td>CHR55441143</td>
                      <td>puny satavas</td>
                      <td></td>
                      <td>sumit</td>
                      <td>sumit</td>
                      <td></td>
                      <td>NGN 102.04</td>
                      <td>NGN 100.00 </td>
                      <td>Verifying</td>
                      <td>
                        <span class="justify-content-center d-flex w-100">
                          <Link to="search_transactions_detail" class="icon_btn" data-toggle="tooltip" title="" data-placement="left" data-original-title="View Detail" aria-describedby="tooltip871476"><i class="fe fe-eye  text-primary mr-2"></i>
                          </Link>
                        </span></td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
  </section>


</main>

        </div>
    );
}

export default Total_transaction_graph;