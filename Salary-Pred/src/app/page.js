"use client";
require('dotenv').config();
import React, { useState } from 'react';
import styles from './page.module.css'; // Ensure the path is correct
import { OpenAI } from 'openai'; // Correct import based on package's export
const openai = new OpenAI(process.env.OPENAI_API_KEY);

const Home = () => {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
          const openaiResponse = await openai.chat.completions.create({
              model: "gpt-4", // Ensure this is the correct model identifier
              messages: [{
                  role: "system",
                  content: "with the attributes given, give an estimated salary of such an induvidual, start with a number guess in your answer" // Optional, include if needed for context
              }, {
                  role: "user",
                  content: message, // The user's message from input
              }],
              max_tokens: 100,
              temperature: 0.7,
          });
          console.log(openaiResponse);
  
          // Correctly accessing the assistant's message content
          if (openaiResponse.choices && openaiResponse.choices.length > 0) {
              const assistantResponseContent = openaiResponse.choices[0].message.content;
              setResponse(assistantResponseContent); // Set the assistant's response to state
          } else {
              setResponse("No response from OpenAI.");
          }
      } catch (error) {
          console.error("Error making the OpenAI request:", error);
          setResponse("An error occurred. Please try again.");
      }
  };

  return (
    <div className={styles.app}>
      <h1>Welcome to Salary Predictor</h1>
      <p>Salary Predictor is an AI-powered tool designed to demonstrate the power of AI, tools and better map the future monetary prospects of college students.</p>
      <p>Enter your attributes below to get started! (Ex: Computer Science Major, Asian, CMU)</p>
      <p>Results may not be satisfactory however simply resubmit if prediction is not offered.</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter attributes, separated by commas"
          className={styles.input}
        />
        
        <button type="submit" className={styles.button}>Send</button> 
        </form>

      {response && <div className={styles.response}><p>{response}</p></div>}
      
      <div>
        <p>What percentage of the population will you land in? </p>
        <img src="https://www.statista.com/graphic/1/203183/percentage-distribution-of-household-income-in-the-us.jpg" alt="Statistic: Percentage distribution of household income in the United States in 2021 | Statista" className={styles.image} />
      </div>
      
      <p>As time goes on, its only natural our population becomes more and more educated; The percentage of our population with a college degree has steadily increased but that also means these degrees are less scarce, and maybe even less valuable.</p>
      <img src="https://www.mastersdegree.net/wp-content/uploads/2018/03/The-Percentage-of-Americans-With-College-Degrees-1.png" alt="College Degrees" className={styles.image} />
    </div>
  );
};

export default Home;
