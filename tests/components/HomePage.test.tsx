import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../../src/pages/HomePage';

describe('HomePage', () => {
    it('renders the header', () => {
        render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        );
        expect(screen.getByText(/Bienvenue/i)).toBeInTheDocument();
    });
});