export default function Contact() {
  return (
    <div className="social-list">
      <ul>
        <li className="bio-item paper-button">
          <a href="https://github.com/AbylayBeisen" title="GitHub" target="_blank" rel="noreferrer">
            <i className="fa fa-fw fa-github" aria-hidden="true"></i>
          </a>
        </li>
        <li className="bio-item paper-button">
          <a title="LinkedIn" target="_blank" rel="noreferrer">
            <i className="fa fa-fw fa-linkedin" aria-hidden="true"></i>
          </a>
        </li>
        <li className="bio-item paper-button">
          <a title="Address" target="_top">
            <i className="fa fa-fw fa-globe" aria-hidden="true"></i>
          </a>
        </li>
      </ul>
    </div>
  );
}