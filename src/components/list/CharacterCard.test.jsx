import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CharacterCard from './CharacterCard';

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

jest.mock('../detail/FavoriteButton', () => () => <button data-testid="favorite-button">Fav</button>);

describe('CharacterCard', () => {
  const mockCharacter = {
    id: 1,
    name: 'Rick Sanchez',
    species: 'Human',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  };

  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockedNavigate.mockClear();
    mockOnClick.mockClear();
  });

  test('renders character name and species', () => {
    render(
      <MemoryRouter>
        <CharacterCard character={mockCharacter} onClick={mockOnClick} selected={false} />
      </MemoryRouter>
    );

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockCharacter.image);
  });

  test('calls onClick and navigates when clicked', () => {
    render(
      <MemoryRouter>
        <CharacterCard character={mockCharacter} onClick={mockOnClick} selected={false} />
      </MemoryRouter>
    );

    const cardElement = screen.getByRole('button', { name: /rick sanchez/i });
    fireEvent.click(cardElement);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith('/character/1');
  });

  test('applies selected style when selected is true', () => {
    const { container } = render(
      <MemoryRouter>
        <CharacterCard character={mockCharacter} onClick={mockOnClick} selected={true} />
      </MemoryRouter>
    );

    const cardElement = container.querySelector('.card');
    expect(cardElement).toHaveClass('!bg-(--color-selected)');
  });

  test('does not apply selected style when selected is false', () => {
    const { container } = render(
      <MemoryRouter>
        <CharacterCard character={mockCharacter} onClick={mockOnClick} selected={false} />
      </MemoryRouter>
    );

    const cardElement = container.querySelector('.card');
    expect(cardElement).not.toHaveClass('bg-[--color-selected]');
  });
});
