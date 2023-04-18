import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import './App.css'
import  { useState, useEffect } from 'react';

interface Country {
  name: string;
  alpha2Code: string;
}
type UserSubmitForm = {
  fullname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
};

const App: React.FC = () => {
  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required('Fullname is required'),
    username: Yup.string()
      .required('Username is required')
      .min(6, 'Username must be at least 6 characters')
      .max(20, 'Username must not exceed 20 characters'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), ''], 'Confirm Password does not match'),
    acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = (data: UserSubmitForm) => {
    console.log(JSON.stringify(data, null, 2));
  };

  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    fetch('https://restcountries.com/v2/all')
      .then(response => response.json())
      .then(data =>
        setCountries(
          data.map((country: any) => ({
            name: country.name,
            alpha2Code: country.alpha2Code,
          }))
        )
      );
  }, []);



  useEffect(() => {
    fetch('api.training.div3.pgtest.co/api/v1/location?pid=242')
      .then(response => response.json())
      .then(data =>
        setCountries(
          data.map((country: any) => ({
            name: country.name,
            alpha2Code: country.alpha2Code,
          }))
        )
      );
  }, []);

  {countries.map(country => (
    <option key={country.alpha2Code} value={country.alpha2Code}>
      {country.name}
    </option>
    ))}


  const texts = {
    en: {
      emailLabel: 'Email address',
      passwordLabel: 'Password',
      confirmPasswordLabel: 'Confirm password',
      fullnameLabel: 'Full name',
      genderLabel: 'Gender',
      selectOption: 'Select...',
      maleOption: 'Male',
      femaleOption: 'Female',
      countryLabel: 'Country',
      provinceLabel: 'Province/City',
      acceptTermsLabel: 'I accept the terms and conditions',
      submitButtonLabel: 'Submit',
      languageSwitchButtonLabel: 'Tiếng Việt',
    },
    vi: {
      emailLabel: 'Địa chỉ Email',
      passwordLabel: 'Mật khẩu',
      confirmPasswordLabel: 'Xác nhận lại mật khẩu',
      fullnameLabel: 'Họ và tên',
      genderLabel: 'Giới tính',
      selectOption: 'Chọn...',
      maleOption: 'Nam',
      femaleOption: 'Nữ',
      countryLabel: 'Quốc gia',
      provinceLabel: 'Tỉnh/ Thành phố',
      acceptTermsLabel: 'Tôi đồng ý với các điều khoản',
      submitButtonLabel: 'Gửi đi',
      languageSwitchButtonLabel: 'English',
    },
  };
  


  
    const [language, setLanguage] = useState('en');
  
    const handleLanguageChange = () => {
      setLanguage(language === 'en' ? 'vi' : 'en');
    };
  
    useEffect(() => {
      const htmlTag = document.getElementsByTagName('html')[0];
      htmlTag.lang = language;
    }, [language]);

 

    const [buttonText, setButtonText] = useState("Click me!")
    var changedBefore = false;

    function changeText() {
        
        if (changedBefore) {
            setButtonText("Tiếng Việt")
        } else {
            setButtonText("English")
        }
        
        changedBefore = !changedBefore
        return buttonText;
    }


    
  return (
    
    <div className="register-form">
      
      {/* <button onClick={handleLanguageChange}>
        {language === 'en'
          ? texts[language].languageSwitchButtonLabel
          :newLocal.languageSwitchButtonLabel}
      </button>  */}

      <button onClick={() => changeText()} style={{backgroundColor:'#007bff', border:'1px solid #ccc', padding:'8px 10px', borderRadius:'5px', color:'white'}}>{buttonText}</button>
        <br></br>
        <br></br>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
          <label>Email Adress</label>
          <input
            type="text"
            {...register('email')}
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            {...register('password')}
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.password?.message}</div>
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            {...register('confirmPassword')}
            className={`form-control ${
              errors.confirmPassword ? 'is-invalid' : ''
            }`}
          />
          <div className="invalid-feedback">
            {errors.confirmPassword?.message}
          </div>
        </div>

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            {...register('fullname')}
            className={`form-control ${errors.fullname ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.fullname?.message}</div>
        </div>

        <div className="form-group">
        <label>Gender</label>
        <br></br>
        <select className="sex" style={{height:'40px', width:'400px', border: '1px solid #ccc',borderRadius:'5px'}}> 
            <option value="1" style={{color:'#ccc'}}>Select...</option>
            <option value="1">Nam</option>
            <option value="2">Nữ</option> 
        </select>
        </div>

        <div className='form-group'>
          <label>Region</label>
          <select className="sex" style={{height:'40px', width:'400px', border: '1px solid #ccc',borderRadius:'5px'}}>
          <option value="1" style={{color:'#ccc'}}>Select...</option>
            {countries.map(country => (
            <option key={country.alpha2Code} value={country.alpha2Code}>
              {country.name}
            </option>
            ))}
        </select>
        </div>



        <div className='form-group'>
          <label>State</label>
          <select className="sex" style={{height:'40px', width:'400px', border: '1px solid #ccc',borderRadius:'5px'}}>
          <option value="1" style={{color:'#ccc'}}>Select...</option>
            {countries.map(country => (
            <option key={country.alpha2Code} value={country.alpha2Code}>
              {country.name}
            </option>
            ))}
        </select>
        </div>
      
    


        <div className="form-group form-check">
          <input
            type="checkbox"
            {...register('acceptTerms')}
            className={`form-check-input ${
              errors.acceptTerms ? 'is-invalid' : ''
            }`}
          />
          <label htmlFor="acceptTerms" className="form-check-label">
            I have read and agree to the Terms
          </label>
          <div className="invalid-feedback">{errors.acceptTerms?.message}</div>
        </div>
        

        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Register
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="btn btn-warning float-right"
          >
            Reset
          </button>
        </div>


      </form>
    </div>
  );
};

export default App;

