import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import LoginForm from './';

test('renders the login form and allows typing', async () => {
    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );
    
    const usernameField = screen.getByLabelText('Username') as HTMLInputElement;
    const passwordField = screen.getByLabelText('Password') as HTMLInputElement;
  
    fireEvent.change(usernameField, { target: { value: 'testUser' } });
    fireEvent.change(passwordField, { target: { value: 'testPass' } });
  
    expect(usernameField.value).toBe('testUser');
    expect(passwordField.value).toBe('testPass');
    
    fireEvent.click(screen.getByText('Login'));
    
    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });