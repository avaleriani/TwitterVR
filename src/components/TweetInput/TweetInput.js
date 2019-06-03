import React from 'react';
import PropTypes from 'prop-types';
import { Paper, TextField, Button, Grid, withStyles } from '@material-ui/core';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
  },
  tweetButton: {
    marginTop: theme.spacing.unit,
  },
});

class TweetInput extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    onSubmit: () => {},
  };

  input = React.createRef();

  onSubmit = event => {
    event.preventDefault();
    const { value } = this.input.current;

    if (!value.trim()) {
      return;
    }

    this.props.onSubmit(value, event);
    this.input.current.value = '';
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.paper}>
        <form onSubmit={this.onSubmit} autoComplete="off">
          <TextField
            required
            fullWidth
            multiline
            rows={2}
            placeholder="What's happening?"
            inputRef={this.input}
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                type="submit"
                className={classes.tweetButton}
              >
                Tweet
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    );
  }
}

export default withStyles(styles)(TweetInput);
