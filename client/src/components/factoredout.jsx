if (this.state.checkOut_picked) {
  return (
    <div>
      <aside className="booking-container">
        <div className="booking">
            <div className="banner-container">
              <div className="nightly-pricing-container">
                <div className="price-banner">
                  <div>
                    <h5 className="nightly-price">${this.state.calculated_average_price_per_night}</h5>
                    <span>per night (2 guests)</span>
                  </div>
                  <div className="hidden">
                    <button className="btn btn-primary btn-flashy book-cta"></button>
                  </div>
                </div>
              </div>
            </div>
            <div className="well">
              <div className="well-content dates-and-guests">
                <div className="row">
                  <div className="col-xs-6 check-in-btn">
                    <div className="label" onClick={this.click}>Check in</div>
                    <span className="value" onClick={this.click}>{this.state.check_in_date}</span>
                  </div>
                  <div className="col-xs-6 check-out-btn">
                    <div className="label" onClick={this.click}>Check out</div>
                    <span className="value" onClick={this.click}>{this.state.check_out_date}</span>
                  </div>
                </div>
                <div>
                  <Guests guests={this.state.max_guests} />
                </div>
                <div>
                  <BookingTotal
                  number_nights={this.state.total_days}
                  average_price_X_nights={this.state.average_price_X_nights}
                  cleaning_fee={this.state.cleaning_fee}
                  />
                </div>
              </div>
            </div>
          </div>
      </aside>
    </div>
  );
}
if (this.state.checkIn_picked) {
  return (
    <div>
      <aside className="booking-container">
        <div className="booking">
            <div className="banner-container">
              <div className="nightly-pricing-container">
                <div className="price-banner">
                  <div>
                    <h5 className="nightly-price">${this.state.average_price_per_night}</h5>
                    <span>per night (2 guests)</span>
                  </div>
                  <div className="hidden">
                    <button className="btn btn-primary btn-flashy book-cta"></button>
                  </div>
                </div>
              </div>
            </div>
            <div className="well">
              <div className="well-content dates-and-guests">
                <div className="row">
                  <div className="col-xs-6 check-in-btn">
                    <div className="label" onClick={this.click}>Check in</div>
                    <span className="value" onClick={this.click}>Select date</span>
                  </div>
                  <div className="col-xs-6 check-out-btn">
                    <div className="label" onClick={this.click}>Check out</div>
                    <span className="value" onClick={this.click}>Select date</span>
                  </div>
                </div>
                <div>
                  <CheckOutCal
                  month={this.state.current_month}
                  campId={this.state.campId}
                  inventory={this.state.inventory}
                  onSubmit={this.handleSubmit}
                  update={this.makeISODate}
                  />
                </div>
                <div>
                  <Guests guests={this.state.max_guests} />
                </div>
              </div>
            </div>
          </div>
      </aside>
    </div>
  );
} else if (this.state.check_in_clicked) {
  return (
    <div>
      <aside className="booking-container">
        <div className="booking">
            <div className="banner-container">
              <div className="nightly-pricing-container">
                <div className="price-banner">
                  <div>
                    <h5 className="nightly-price">${this.state.average_price_per_night}</h5>
                    <span>per night (2 guests)</span>
                  </div>
                  <div className="hidden">
                    <button className="btn btn-primary btn-flashy book-cta"></button>
                  </div>
                </div>
              </div>
            </div>
            <div className="well">
              <div className="well-content dates-and-guests">
                <div className="row">
                  <div className="col-xs-6 check-in-btn">
                    <div className="label" onClick={this.click}>Check in</div>
                    <span className="value" onClick={this.click}>Select date</span>
                  </div>
                  <div className="col-xs-6 check-out-btn">
                    <div className="label" onClick={this.click}>Check out</div>
                    <span className="value" onClick={this.click}>Select date</span>
                  </div>
                </div>
                <div>
                  <CheckInCal
                    month={this.state.current_month}
                    campId={this.state.campId}
                    inventory={this.state.inventory}
                    submit={this.handleSubmit}
                    update={this.makeISODate}
                  />
                </div>
                <div>
                  <Guests guests={this.state.max_guests} />
                </div>
              </div>
            </div>
          </div>
      </aside>
    </div>
);
} else {