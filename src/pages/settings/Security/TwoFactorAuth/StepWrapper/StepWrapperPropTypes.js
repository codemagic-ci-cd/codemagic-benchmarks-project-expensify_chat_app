import PropTypes from "prop-types";

export default {
    /** Title of the Header */
    title: PropTypes.string,

    /** Data to display a step counter in the header */
    stepCounter: PropTypes.shape({
        step: PropTypes.number,
        total: PropTypes.number,
        text: PropTypes.string,
    }),

    /** Method to trigger when pressing back button of the header */
    onBackButtonPress: PropTypes.func,

    /** Children components */
    children: PropTypes.node,
}
