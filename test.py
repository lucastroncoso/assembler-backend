import sys
from time import sleep
from unittest import result
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from parsel import Selector

# driver = webdriver.Chrome()
options = Options()
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

try:
    driver.get('https://www.linkedin.com/')
    username = driver.find_element(By.CLASS_NAME, 'input__input')
    username.send_keys('lucastroncoso.seguros@gmail.com')
    password = driver.find_element(By.ID, 'session_password')
    password.send_keys('Mevanapagarendolares1000!')
    # Clicking on the login button
    log_in_button = driver.find_element(
        By.CLASS_NAME, 'sign-in-form__submit-button')
    log_in_button.click()

    result = {}

    driver.get(sys.argv[1])
    sel = Selector(text=driver.page_source)
    sleep(2)
    name = sel.xpath(
           '//*[starts-with(@class, "text-heading-xlarge")]/text()').extract_first()
    if name:
        result['name'] = name.strip()
    else:
        result['name'] = 'No Result'
    job_title = sel.xpath(
        '//*[starts-with(@class, "text-body-medium")]/text()').extract_first()
    if job_title:
        result['job_title'] = job_title.strip()
    else:
        result['job_title'] = 'No Result'
    company = sel.xpath(
        '//*[starts-with(@style, "line-height:2rem;max-height:4rem;-webkit-line-clamp:2;")]/text()').extract_first()
    if company:
        result['company'] = company.strip()
    else:
        result['company'] = 'No Result'
    university = sel.xpath(
        '//*[starts-with(@class, "mr1 hoverable-link-text t-bold")]/span/text()').extract_first()
    if university:
        result['university'] = university.strip()
    else:
        result['university'] = 'No Result'
    location = sel.xpath(
        '//*[starts-with(@class, "text-body-small")]/text()').extract_first()
    if location:
        result['location'] = location.strip()
    else:
        result['location'] = 'No Result'
    print(result)
except Exception as e:
    print(e)

sys.stdout.flush()
