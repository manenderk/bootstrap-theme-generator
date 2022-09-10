import axios from 'axios';
import { useEffect, useState } from 'react';
import PreviewResultComponent from '../../components/preview-result-component/preview-result-component';
import useDebounce from '../../hooks/useDebounce';
import './work-page.scss';

export function WorkPage({
  ...props
}) {

  const baseUrl = '/api/boostrap-styles';

  const [categories, setCategories] = useState([]);

  const [defaultStyles, setDefaultStyles] = useState([]);
  const [customizedStyles, setCustomizedStyles] = useState([]);
  const debouncedCustomizedStyles = useDebounce(customizedStyles, 2000);
  const [computedStyle, setComputedStyle] = useState('')

  const getDefaultStyles = async () => {
    const resp = await axios.get(baseUrl + '/default-styles');
    setDefaultStyles(resp.data);
  }

  const getComputedStyle = async () => {
    const resp = await axios.post(baseUrl + '/computed-style', {
      customizedStyles: JSON.stringify(customizedStyles)
    });
    setComputedStyle(resp.data.style);
  }

  const getStylesOfCategory = (category) => {
    const styles = defaultStyles.filter(s => s.category === category);
    console.log(styles);
    return styles;
  }

  const updateStyleValue = (id, value) => {
    if (!value) {
      setCustomizedStyles(customizedStyles.filter(s => s.id !== id));
      return;
    }
    const style = defaultStyles.find(s => s.id === id);
    if (!style) {
      return;
    }
    if (style.defaultValue === value) {
      setCustomizedStyles(customizedStyles.filter(s => s.id !== id));
      return;
    }

    const existingCustomStyle = customizedStyles.find(s => s.id === id);
    if (existingCustomStyle) {
      setCustomizedStyles(customizedStyles.map(s => {
        if (s.id === id) {
          s.value = value;
        }
        return s;
      }))
    } else {
      setCustomizedStyles([...customizedStyles, {
        id,
        value
      }])
    }
  }

  const getCustomizedStyleValue = (id) => {
    const style = customizedStyles.find(s => s.id === id);
    return style?.value || '';
  }

  useEffect(() => {
    getDefaultStyles();
    getComputedStyle();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCategories([... new Set(defaultStyles.map(s => s.category))]);
  }, [defaultStyles])

  useEffect(() => {
    getComputedStyle();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedCustomizedStyles])

  return (
    <div className="container-fluid">
      <div className="row work-page">
        <div className="col-md-2 column bg-light">
          <ul className="nav flex-column">
            {categories.map((c, i) => (
              <li className="nav-item my-1 rounded bg-white" key={i}>
                <a
                  className="nav-link text-secondary"
                  aria-current="page"
                  href={`#category-${c}`}
                >
                  {c}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-5 column">
          {categories.map((c, i) => (
            <div className="my-2 py-2" key={i} id={`category-${c}`}>
              <h2>{c}</h2>
              <div className='row'>
                {
                  getStylesOfCategory(c).map(style => (
                    <div className="col-md-6 mb-2" key={style.id}>
                      <div className="form-floating">
                        <input type="text" className="form-control" id={`style-${style.id}`} value={getCustomizedStyleValue(style.id)} onChange={(e) => updateStyleValue(style.id, e.target.value)} placeholder="hello" />
                        <label htmlFor={`style-${style.id}`}>{style.title}</label>
                      </div>
                    </div>


                  ))
                }
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-5 column">
          <PreviewResultComponent styles={computedStyle} />
        </div>
      </div>
    </div>
  );
}
export default WorkPage;
