# app.py
from flask import Flask, render_template, request, redirect, url_for, flash
import os
import pandas as pd
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'your_secure_secret_key'  # Replace with a secure key in production

# Path to store the contact data
DATA_FILE = 'contacts.xlsx'

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/contact', methods=['POST'])
def contact():
    name = request.form.get('name')
    email = request.form.get('email')
    message = request.form.get('message')

    if not name or not email or not message:
        flash('All fields are required!', 'error')
        return redirect(url_for('home'))

    # Prepare the data
    data = {
        'Timestamp': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        'Name': name,
        'Email': email,
        'Message': message
    }

    # Check if the file exists
    if os.path.exists(DATA_FILE):
        try:
            df_existing = pd.read_excel(DATA_FILE)
            df_new = pd.DataFrame([data])
            df_combined = pd.concat([df_existing, df_new], ignore_index=True)
        except Exception as e:
            flash(f'Error reading existing data: {e}', 'error')
            return redirect(url_for('home'))
    else:
        df_combined = pd.DataFrame([data])

    # Save to Excel
    try:
        df_combined.to_excel(DATA_FILE, index=False)
    except Exception as e:
        flash(f'Error saving data: {e}', 'error')
        return redirect(url_for('home'))

    flash('Your message has been sent successfully!', 'success')
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)
