import { useEffect, useState } from 'react';
import PreviewResultComponent from '../../components/preview-result-component/preview-result-component';
import './work-page.scss';
export function WorkPage(props) {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    let arr = [];
    for (var i = 1; i <= 50; i++) {
      arr.push(i);
    }
    setSections(arr);
  }, []);

  return (
    <div className="container-fluid">
      <div className="row work-page">
        <div className="col-md-2 column bg-light">
          <ul className="nav flex-column">
            {sections.map((s, i) => (
              <li className="nav-item my-1 rounded bg-white" key={i}>
                <a
                  className="nav-link text-secondary"
                  aria-current="page"
                  href={`#section-${s}`}
                >
                  Section {s}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-5 column">
          {sections.map((s, i) => (
            <div className="my-5 py-5" key={i} id={`section-${s}`}>
              <h1 className="display-1">Section {s}</h1>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Impedit fugit dolor earum veniam blanditiis, illo ullam amet
                totam harum laudantium voluptatibus. Commodi odio, ipsum
                asperiores magnam assumenda hic ea? Totam!
              </p>
            </div>
          ))}
        </div>
        <div className="col-md-5 column">
          <PreviewResultComponent />
        </div>
      </div>
    </div>
  );
}
export default WorkPage;
