import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RimacLayout } from './RimacLayout';

// Mockeamos Header y Footer para aislar el layout
vi.mock('./Header', () => ({
  Header: () => <header data-testid="header-mock">Mock Header</header>,
}));

vi.mock('./Footer', () => ({
  Footer: () => <footer data-testid="footer-mock">Mock Footer</footer>,
}));

describe('<RimacLayout />', () => {
  it('debe renderizar el Header', () => {
    render(
      <RimacLayout>
        <div>Contenido de prueba</div>
      </RimacLayout>
    );

    const header = screen.getByTestId('header-mock');
    expect(header).toBeInTheDocument();
  });

  it('debe renderizar el Footer', () => {
    render(
      <RimacLayout>
        <div>Contenido de prueba</div>
      </RimacLayout>
    );

    const footer = screen.getByTestId('footer-mock');
    expect(footer).toBeInTheDocument();
  });

  it('debe renderizar el contenido pasado por children', () => {
    render(
      <RimacLayout>
        <p>Hola desde children</p>
      </RimacLayout>
    );

    const content = screen.getByText('Hola desde children');
    expect(content).toBeInTheDocument();
  });

  it('debe tener la estructura base con sus clases', () => {
    const { container } = render(
      <RimacLayout>
        <span>Contenido</span>
      </RimacLayout>
    );

    const wrapper = container.querySelector('.l-rimac');
    const main = container.querySelector('.l-rimac__main');

    expect(wrapper).toBeInTheDocument();
    expect(main).toBeInTheDocument();
  });

  it('debe renderizar los elementos en el orden correcto', () => {
    const { container } = render(
      <RimacLayout>
        <div>Contenido</div>
      </RimacLayout>
    );

    const children = container.firstElementChild?.children;

    expect(children?.[0].tagName).toBe('HEADER');
    expect(children?.[1].tagName).toBe('MAIN');
    expect(children?.[2].tagName).toBe('FOOTER');
  });
});
