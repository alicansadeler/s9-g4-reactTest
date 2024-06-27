import { afterEach, beforeEach, expect, test } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import fs from "fs";
import path from "path";
import IletisimFormu from "./IletisimFormu";

//eksik import buraya
//fixin tuzağı buraya? detaylar readme dosyasında.

beforeEach(() => {
  render(<IletisimFormu />);
});

test("[1] hata olmadan render ediliyor", () => {
  render(<IletisimFormu />);
});

test("[2] iletişim formu headerı render ediliyor", () => {
  //get by text ile h1 tagini yakalayın
  //to be in the document, to be truthy, to have text content ile kontrol edin.

  const form = screen.getByText(/İletişim Formu/i);
  expect(form).toBeInTheDocument();
  expect(form).toBeTruthy();
  expect(form).toHaveTextContent("İletişim Formu");
});

test("[3] kullanıcı adını 5 karakterden az girdiğinde BİR hata mesajı render ediyor.", async () => {
  const adBul = screen.getByLabelText("Ad*");
  userEvent.type(adBul, "test");
  const hataMesaları = await screen.findAllByTestId("error");

  expect(hataMesaları).toHaveLength(1);
});

test("[4] kullanıcı inputları doldurmadığında ÜÇ hata mesajı render ediliyor.", async () => {
  const buton = screen.getByRole("button");
  userEvent.click(buton);
  const hataMesaları = await screen.findAllByTestId("error");

  expect(hataMesaları).toHaveLength(3);
});

test("[5] kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.", async () => {
  //get by test id ile input alanlarını yakalayın
  //error mesajlarının to have lengthine bakarak kontrol edin

  const adBul = screen.getByTestId("name-input");
  userEvent.type(adBul, "Ali Can");

  const soyadBul = screen.getByTestId("lastName-input");
  userEvent.type(soyadBul, "Sadeler");

  const buton = screen.getByRole("button");
  userEvent.click(buton);

  const hataMesaları = await screen.findAllByTestId("error");

  expect(hataMesaları).toHaveLength(1);
});

test('[6] geçersiz bir mail girildiğinde "Hata: email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {
  //errorı get by test id ile yakalayın
  //to have text content ile hata metnini kontrol edin

  const adBul = screen.getByTestId("name-input");
  userEvent.type(adBul, "Ali Can");

  const soyadBul = screen.getByTestId("lastName-input");
  userEvent.type(soyadBul, "Sadeler");

  const mailBul = screen.getByTestId("email-input");
  userEvent.type(mailBul, "test-hatali");

  const buton = screen.getByRole("button");
  userEvent.click(buton);

  const hataMesajları = screen.getByTestId("error");

  expect(hataMesajları).toHaveTextContent(
    "Hata: email geçerli bir email adresi olmalıdır."
  );
});

test('[7] soyad girilmeden gönderilirse "Hata: soyad gereklidir." mesajı render ediliyor', async () => {
  //find by text ve to be in the document ile hata metni ekranda mı kontrol edin

  const buton = screen.getByRole("button");
  userEvent.click(buton);

  const hataMesajları = await screen.findByText("Hata: soyad gereklidir.");
  expect(hataMesajları).toBeInTheDocument();
});

test("[8] ad, soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.", async () => {
  const adBul = screen.getByTestId("name-input");
  userEvent.type(adBul, "Ali Can");

  const soyadBul = screen.getByTestId("lastName-input");
  userEvent.type(soyadBul, "Sadeler");

  const mailBul = screen.getByTestId("email-input");
  userEvent.type(mailBul, "test123@test.com");

  const buton = screen.getByRole("button");
  userEvent.click(buton);

  const hataMesajları = screen.queryAllByTestId("error");

  expect(hataMesajları).toHaveLength(0);
});

test("[9] form gönderildiğinde girilen tüm değerler render ediliyor.", async () => {
  const adBul = screen.getByTestId("name-input");
  userEvent.type(adBul, "Ali Can");

  const soyadBul = screen.getByTestId("lastName-input");
  userEvent.type(soyadBul, "Sadeler");

  const mailBul = screen.getByTestId("email-input");
  userEvent.type(mailBul, "test123@test.com");

  const mesajBul = screen.getByTestId("message-input");
  userEvent.type(mesajBul, "Ali Can Sadeler");

  const buton = screen.getByRole("button");
  userEvent.click(buton);

  const girdi1 = await screen.findByText("Ali Can");
  const girdi2 = await screen.findByText("Sadeler");
  const girdi3 = await screen.findByText("test123@test.com");
  const girdi4 = await screen.findByText("Ali Can Sadeler");

  expect(girdi1).toBeInTheDocument();
  expect(girdi2).toBeInTheDocument();
  expect(girdi3).toBeInTheDocument();
  expect(girdi4).toBeInTheDocument();
});

//

//

// BURADAN SONRASINA DOKUNMAYIN //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
const testFile = fs
  .readFileSync(path.resolve(__dirname, "./IletisimFormu.test.jsx"), "utf8")
  .replaceAll(/(?:\r\n|\r|\n| )/g, "");
const tests = testFile.split("test(");

test("Kontrol: IletisimFormu componenti import edilmiş.", async () => {
  expect(tests[0]).toContain("importIletisimFormufrom");
});

test("Kontrol: test[1] için render metodu kullanılmış", async () => {
  expect(tests[1]).toContain("render(<IletisimFormu");
});

test("Kontrol: test[2] için screen.getByText(...) kullanılmış", async () => {
  expect(tests[2]).toContain("screen.getByText(");
});

test("Kontrol: test[2] için .toBeInTheDocument() ile kontrol edilmiş", async () => {
  expect(tests[2]).toContain(".toBeInTheDocument()");
});

test("Kontrol: test[2] için .toBeTruthy() ile kontrol edilmiş", async () => {
  expect(tests[2]).toContain(".toBeTruthy()");
});

test("Kontrol: test[2] için .toHaveTextContent(...) ile kontrol edilmiş", async () => {
  expect(tests[2]).toContain(".toHaveTextContent(");
});

test("Kontrol: test[3] için screen.getByLabelText(...) kullanılmış", async () => {
  expect(tests[3]).toContain("screen.getByLabelText(");
});

test("Kontrol: test[3] için screen.findAllByTestId(...) kullanılmış", async () => {
  expect(tests[3]).toContain("screen.findAllByTestId(");
});

test("Kontrol: test[3] için findAllByTestId await ile kullanılmış", async () => {
  expect(tests[3]).toContain("awaitscreen.findAllByTestId");
});

test("Kontrol: test[3] için .toHaveLength(...) ile kontrol edilmiş", async () => {
  expect(tests[3]).toContain(".toHaveLength(1)");
});

test("Kontrol: test[4] için .getByRole(...) kullanılmış ", async () => {
  expect(tests[4]).toContain("screen.getByRole(");
});

test("Kontrol: test[4] için .toHaveLength(...) ile kontrol edilmiş", async () => {
  expect(tests[4]).toContain(".toHaveLength(3)");
});

test("Kontrol: test[5] için .getByTestId(...) kullanılmış", async () => {
  expect(tests[5]).toContain("screen.getByTestId(");
});

test("Kontrol: test[5] için .toHaveLength(...) ile kontrol edilmiş", async () => {
  expect(tests[5]).toContain(".toHaveLength(1)");
});

test("Kontrol: test[6] için .getByTestId(...) kullanılmış", async () => {
  expect(tests[6]).toContain("screen.getByTestId(");
});

test("Kontrol: test[6] için .toHaveTextContent(...) ile kontrol edilmiş", async () => {
  expect(tests[6]).toContain(").toHaveTextContent(");
});

test("Kontrol: test[7] için .findByText(...) await ile kullanılmış", async () => {
  expect(tests[7]).toContain("awaitscreen.findByText(");
});

test("Kontrol: test[7] için .toBeInTheDocument() ile kontrol edilmiş", async () => {
  expect(tests[7]).toContain(").toBeInTheDocument()");
});

test("Kontrol: tüm testlerde(test1 hariç) iletişim formu ayrı ayrı render edilmesi yerine beforeEach hooku kullılarak, render içinde yapılmış.", async () => {
  expect(tests[0]).toContain("beforeEach(()=>{");
  expect(tests[0]).toContain("render(<IletisimFormu/>)");
});
