import React from "react";
import { connect } from "react-redux";

const KissSarahButton = (props) => {
  return (
    <div>
      <button
        onClick={() => {
          console.log("about to kiss sarah!");
          props.goKissSarah();
        }}
      >
        Kiss Sarah
      </button>
      {props.numberOfSarahKisses}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    numberOfSarahKisses: state.don.kissCounter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    goKissSarah: () => dispatch({ type: "KISS_SARAH", numKisses: 5 }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(KissSarahButton);
