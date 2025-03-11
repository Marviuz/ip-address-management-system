import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import { format } from 'date-fns';
import { DateTimeDetailsHoverCard } from './datetime-details-hover-card';
import '@testing-library/jest-dom';

const mockDate = new Date('2025-03-10T12:00:00Z');
const formattedDate = format(mockDate, 'yyyy-MM-dd HH:mm:ss');

const OPEN_DELAY = 1000;

describe('dateTimeDetailsHoverCard', () => {
  it('renders the created date correctly', () => {
    render(<DateTimeDetailsHoverCard createdAt={mockDate} />);
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });

  it('renders the updated date if different from the created date', async () => {
    const updatedDate = new Date('2025-03-11T14:30:00Z');
    const user = userEvent.setup();
    render(
      <DateTimeDetailsHoverCard createdAt={mockDate} updatedAt={updatedDate} />,
    );

    const trigger = screen.getByText(formattedDate);
    await user.hover(trigger);

    await waitFor(
      () => {
        expect(
          screen.getByText(format(updatedDate, 'EEEE, MMMM d, yyyy')),
        ).toBeInTheDocument();
      },
      {
        timeout: OPEN_DELAY,
      },
    );
  });

  it('does not render the updated date section if updatedAt is the same as createdAt', () => {
    render(
      <DateTimeDetailsHoverCard createdAt={mockDate} updatedAt={mockDate} />,
    );
    expect(screen.queryByText('Date modified')).not.toBeInTheDocument();
  });

  it('renders custom labels correctly', async () => {
    const user = userEvent.setup();

    render(
      <DateTimeDetailsHoverCard
        createdAt={mockDate}
        createdLabel="Custom Created Label"
        updatedAt={new Date()}
        updatedLabel="Custom Updated Label"
      />,
    );

    const trigger = screen.getByText(formattedDate);
    await user.hover(trigger);

    await waitFor(
      async () =>
        await screen.findByText(format(mockDate, 'EEEE, MMMM d, yyyy')),
      {
        timeout: OPEN_DELAY,
      },
    );

    expect(screen.getByText('Custom Created Label')).toBeInTheDocument();
    expect(screen.getByText('Custom Updated Label')).toBeInTheDocument();
  });
});
