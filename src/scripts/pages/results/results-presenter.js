class ResultsPresenter {
  #view;

  constructor({ view }) {
    this.#view = view;
    console.log('ResultsPresenter initialized.');
  }
}

export default ResultsPresenter;