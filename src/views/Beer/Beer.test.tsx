import { describe, expect, it} from "vitest";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import "@testing-library/jest-dom/vitest";
import Beer from '.';

describe('Beer', () => {
    it("Checking if 'Beer' page loaded with all necessary elements", () => {
        render(
            <BrowserRouter>
                <Beer/>
            </BrowserRouter>
        );
        expect(screen.getByRole('img', { name: 'Beer Image' })).toBeInTheDocument();
    });
});