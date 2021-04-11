import styled from './thumbnail.module.scss';

export function Thumbnail({
  text,
  icon
}) {
  return (
    <header className={styled.geral}>
      <main>
        {icon && <img src={icon} />}
        {text && <h1>{text}</h1>}
      </main>
    </header>
  )
}