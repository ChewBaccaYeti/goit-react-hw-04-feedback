import { useState } from 'react';
import { FeedbackOptions } from './Feedback/FeedbackOptions/FeedbackOptions';
import { Notifications } from './Feedback/Notifications/Notifications';
import { Section } from './Feedback/Section/Section';
import { Statistics } from './Feedback/Statistics/Statistics';
import { GlobalStyle } from 'GlobalStyle';
import { Container } from './Layout/Layout.styled';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const feedback = { good, neutral, bad };

  const handleBtnClick = ({ target: { value } }) => {
    switch (value) {
      case 'good':
        return setGood(s => s + 1);
      case 'neutral':
        return setNeutral(s => s + 1);
      case 'bad':
        return setBad(s => s + 1);
      default:
        return;
    }
  };

  const countTotalFeedback = () =>
    Object.values(feedback).reduce((total, prevState) => total + prevState, 0);

  const countPositiveFeedbackPercentage = () =>
    Math.round((good / countTotalFeedback()) * 100);

  return (
    <Container>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={Object.keys(feedback)}
          onLeaveFeedback={handleBtnClick}
        ></FeedbackOptions>
      </Section>

      <Section title="Statistics">
        {countTotalFeedback() > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback}
            positivePercentage={countPositiveFeedbackPercentage}
          />
        ) : (
          <Notifications message="There is no feedback" />
        )}
      </Section>

      <GlobalStyle />
    </Container>
  );
};
