import { describe, expect, it} from "vitest";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import "@testing-library/jest-dom/vitest";
import Home from '.';

describe('Home', () => {
    it("Checking if Home page loaded with all expected elements", () => {
        render(
            <BrowserRouter>
                <Home/>
            </BrowserRouter>
        ); 
        expect(screen.getByRole('link', { name: 'beer' })).toHaveAttribute('href', '/beer')
        expect(screen.getByRole('img', { name: 'beer glass' })).toBeInTheDocument();
        expect(screen.getByRole('heading', {level: 1})).toHaveTextContent("Find your perfect");
    });
});