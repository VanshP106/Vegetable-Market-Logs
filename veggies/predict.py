import streamlit as st
import joblib
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

# Load the trained model
model = joblib.load('veggies.pkl')  # Adjust the path as needed

# Calculate the next date as the default date
next_date = datetime.now() + timedelta(days=1)  # Set the default date as the next date

# Initialize data for the empty graph
empty_data = {
    'Date': [],
    'Price': []
}

# Streamlit app title
st.title('Vegetable and Fruit Price Prediction App')

# Create a layout with two columns
col1, col2 = st.columns(2)

# User input for day, month, year, and item name with default values in the left column
with col1:
    day = st.text_input('Enter Day:', next_date.day)
    month = st.text_input('Enter Month:', next_date.month)
    year = st.text_input('Enter Year:', next_date.year)
    vegetable_names = [
        'Amla',
        'Tomato',
        'Mango',
        'Peaches',
        'Apple Premium',
        'Beans',
        'Capsicum',
        'Kiwi fruit',
        'Potato(M)',
        # Add more vegetable names as needed
    ]
    item_name_str = st.selectbox('Select Vegetable Name:', vegetable_names)
    item_name_to_int = {
        'Amla': 0,
        'Tomato': 321,
        'Mango': 196,
        'Peaches': 249,
        'Apple Premium': 11,
        'Beans': 34,
        'Capsicum': 64,
        'Kiwi fruit': 181,
        'Potato(M)': 272
        # Add more mappings as needed
    }
    item_name_int = item_name_to_int.get(item_name_str, -1)  # Default to -1 if item name is not found

    if st.button('Predict'):
        try:
            input_date = datetime(int(year), int(month), int(day))
            entered_date_prediction = model.predict([[day, month, year, item_name_int]])[0]
        except Exception as e:
            st.error(f'Prediction error: {e}')

    # Display the predicted price for the set date and item name
    if 'entered_date_prediction' in locals():
        st.success(f'Predicted Price for {day}/{month}/{year} ({item_name_str}): {entered_date_prediction}')

# Display the prediction graph in the right column
with col2:
    st.title('Price Prediction Graph')
    if 'entered_date_prediction' in locals():
        predictions = []
        for i in range(7):
            current_date = input_date + relativedelta(months=i)
            prediction = model.predict([[current_date.day, current_date.month, current_date.year, item_name_int]])
            predictions.append((current_date, prediction[0]))

        if not predictions:
            st.warning('Press the "Predict" button to see the graph.')

        else:
            prediction_dates = [date.strftime('%Y-%m-%d') for date, _ in predictions]
            predicted_prices = [price for _, price in predictions]
            plt.figure(figsize=(10, 5))
            plt.plot(prediction_dates, predicted_prices, marker='o', linestyle='-', color='b')
            plt.title(f'Price Prediction for {item_name_str} Over the Next 7 Months with Monthly Gap')
            plt.xlabel('Date')
            plt.ylabel('Price')
            plt.xticks(rotation=45)
            st.pyplot(plt)
