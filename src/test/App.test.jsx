import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

// Mock GameScreen to avoid AI service calls, useGameState, and STORY_MAP complexity.
// The mock accepts the same props as the real component (discId, onBack) so that
// App wires up correctly, and exposes discId via data-testid for assertions.
vi.mock("../components/GameScreen", () => ({
  default: ({ discId, onBack }) => (
    <div data-testid="game-screen" data-disc-id={discId}>
      <span>Game</span>
      <button onClick={onBack}>Back</button>
    </div>
  ),
}));

describe("App – card click initialises the game", () => {
  it("renders the home screen on initial load", () => {
    render(<App />);

    // The home title is present
    expect(screen.getByText("The Random Minds")).toBeInTheDocument();

    // All six disc titles from DISCS are listed
    expect(screen.getByText("The Cave")).toBeInTheDocument();
    expect(screen.getByText("Adventure Quest")).toBeInTheDocument();
    expect(screen.getByText("Puzzle Mania")).toBeInTheDocument();
    expect(screen.getByText("Football Frenzy")).toBeInTheDocument();
    expect(screen.getByText("Chess Master")).toBeInTheDocument();
    expect(screen.getByText("City Builder")).toBeInTheDocument();

    // GameScreen must NOT be present yet
    expect(screen.queryByTestId("game-screen")).not.toBeInTheDocument();
  });

  it("shows GameScreen with the correct discId after clicking a playable card", async () => {
    const user = userEvent.setup();
    render(<App />);

    // "The Cave" is the only playable card in DISCS (playable: true).
    // GameCard renders the disc title inside a div.card, so we click on the
    // title text which is a direct child of that clickable div.
    const caveTitle = screen.getByText("The Cave");
    await user.click(caveTitle);

    // Home screen title should be gone
    expect(screen.queryByText("The Random Minds")).not.toBeInTheDocument();

    // GameScreen mock should now be rendered with the correct disc id
    const gameScreen = screen.getByTestId("game-screen");
    expect(gameScreen).toBeInTheDocument();
    expect(gameScreen).toHaveAttribute("data-disc-id", "the-cave");
  });

  it("does not navigate when a non-playable card is clicked", async () => {
    const user = userEvent.setup();
    render(<App />);

    // "Adventure Quest" has playable: false — its GameCard wraps the click in
    // `playable && onSelect(disc.id)`, so clicking it must not trigger navigation.
    const lockedTitle = screen.getByText("Adventure Quest");
    await user.click(lockedTitle);

    // Home screen should still be visible
    expect(screen.getByText("The Random Minds")).toBeInTheDocument();
    expect(screen.queryByTestId("game-screen")).not.toBeInTheDocument();
  });

  it("returns to the home screen when the Back button is pressed", async () => {
    const user = userEvent.setup();
    render(<App />);

    // Navigate into the game
    await user.click(screen.getByText("The Cave"));
    expect(screen.getByTestId("game-screen")).toBeInTheDocument();

    // Press the Back button exposed by the GameScreen mock (calls onBack)
    await user.click(screen.getByRole("button", { name: "Back" }));

    // Should be back on the home screen
    expect(screen.getByText("The Random Minds")).toBeInTheDocument();
    expect(screen.queryByTestId("game-screen")).not.toBeInTheDocument();
  });
});
