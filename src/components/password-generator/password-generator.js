import React, {useState, useRef} from 'react';
import {Button, Row, Col, Input, Checkbox, Icon, notification} from 'antd';

import './password-generator.sass';
import {RandomValueGenerator, validator} from '../../utils';

const {getRandomPassword} = new RandomValueGenerator();
const {isChecked, isValueNumber} = validator();

const PasswordGenerator = () => {
    const [password, getPassword] = useState('');

    const [data, setData] = useState({
        checkbox: ['lower'], lengthPassword: '8'
    });

    const textRef = useRef(null);

    const handleClick = () => {
        const checked = isChecked(data.checkbox);
        const valueNumber = isValueNumber(data.lengthPassword);
        if (!checked) {
            message('Не выбраны опции', 'error')
        }
        if (!valueNumber) {
            message('Укажите длину пароля', 'error')
        }
        if (valueNumber && checked)
            getPassword(getRandomPassword(data.lengthPassword, data.checkbox));

    };

    const handleChange = (event) => {
        const value = event.target.value;
        setData({...data, lengthPassword: value + ''})
    };

    const handleCheckbox = (value) => {
        setData({...data, checkbox: value})
    };

    const copyToClipboard = () => {
        textRef.current.select();
        document.execCommand('copy');
        if (!password.length) return message('Нечего копировать', 'error');
        message('текст скопирован', 'success');
    };


    const message = (textMessage, type) => {
        notification[type]({
            key: textMessage,
            message: textMessage
        });
    };

    return (
        <>
            <div className='password-generator'>
                <div className='password-generator__title'>
                    <Icon type='lock' theme='twoTone'/>
                    <span>Генератор пароля</span>
                </div>
                <Input type='text'
                       size="large"
                       id='password'
                       className='password-generator__display'
                       value={password}
                       ref={textRef}
                       suffix={<Icon type='copy'
                                     onClick={copyToClipboard}/>}
                />

                <div className='password-generator__settings'>
                    <Row type='flex'
                         justify='space-between'
                         className='password-generator__row password-generator__row--len'
                    >
                        <Col>Длина пароля</Col>
                        <Col>
                            <Input value={data.lengthPassword}
                                   onChange={(event) => handleChange(event)}
                            />
                        </Col>
                    </Row>
                    <Checkbox.Group style={{width: '100%'}}
                                    onChange={handleCheckbox}
                                    defaultValue={data.checkbox}
                    >
                        <Row type='flex'
                             justify='space-between'
                             className='password-generator__row'
                        >
                            <Col>Добавить заглавные буквы</Col>
                            <Col>
                                <Checkbox checked value='upper'/>
                            </Col>
                        </Row>
                        <Row type='flex'
                             justify='space-between'
                             className='password-generator__row'>
                            <Col>Добавить строчные буквы</Col>
                            <Col>
                                <Checkbox checked value='lower'/>
                            </Col>
                        </Row>
                        <Row type='flex'
                             justify='space-between'
                             className='password-generator__row'
                        >
                            <Col>Добавить цифры</Col>
                            <Col>
                                <Checkbox checked value='number'/>
                            </Col>
                        </Row>
                        <Row type='flex'
                             justify='space-between'
                             className='password-generator__row'
                        >
                            <Col>Добавить символы</Col>
                            <Col>
                                <Checkbox checked value='symbol'/>
                            </Col>
                        </Row>
                    </Checkbox.Group>
                </div>
                <Row type='flex'
                     justify='center'
                     className='password-generator__row password-generator__row--btn'
                >
                    <Button type='primary'
                            onClick={handleClick}>
                        Сгенерировать пароль
                    </Button>
                </Row>
            </div>
        </>
    )
};

export default PasswordGenerator;