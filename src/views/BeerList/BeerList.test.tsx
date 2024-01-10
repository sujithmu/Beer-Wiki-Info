import { describe, expect, it} from "vitest";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import "@testing-library/jest-dom/vitest";
import BeerList from '.';

describe('BeerList', () => {
    it("Checking 'Beer Listing' page is loaded with necessary elements", () => {
        render(
            <BrowserRouter>
                <BeerList/>
            </BrowserRouter>
        );
        const listGrid = screen.getByRole("list");
        expect(listGrid).toBeInTheDocument();
    });
});