import { Aside } from "@components/Aside";
import { Footer } from "@components/Footer";
import { Header } from "@components/Header";
import { Main } from "@components/Main";

import {
  Alert,
  AlertAnimation,
  AlertProps,
  AlertType,
} from "@/components/Alert";
import { useRef, useState } from "react";

const types = ["success", "error", "warning", "info"];
const titles = [
  "Alerta de Sucesso",
  "Alerta de Erro",
  "Alerta de Atenção",
  "Alerta de Informação",
];

const messages = [
  "Mensagem de sucesso",
  "Mensagem de erro",
  "Mensagem de atenção",
  "Mensagem de informação",
];

const dates = [
  new Date("2021-08-01T10:00:00.000Z"),
  new Date("2021-08-02T19:00:00.000Z"),
  new Date("2021-08-03T12:00:00.000Z"),
  new Date("2021-08-04T15:00:00.000Z"),
];

const alerts = [
  {
    type: "success" as AlertType,
    title: "Alerta de Sucesso",
    message: "Mensagem de sucesso",
    date: new Date("2021-08-01T10:00:00.000Z"),
  },
  {
    type: "error" as AlertType,
    title: "Alerta de Erro",
    message: "Mensagem de erro",
    date: new Date("2021-08-02T19:00:00.000Z"),
  },
  {
    type: "warning" as AlertType,
    title: "Alerta de Atenção",
    message: "Mensagem de atenção",
    date: new Date("2021-08-03T12:00:00.000Z"),
  },
  {
    type: "info" as AlertType,
    title: "Alerta de Informação",
    message: "Mensagem de informação",
    date: new Date("2021-08-04T15:00:00.000Z"),
  },
  {
    type: "success" as AlertType,
    title: "Alerta de Sucesso",
    message: "Mensagem de sucesso",
    date: new Date("2021-08-01T10:00:00.000Z"),
  },
];

export default function Home() {
  const ulRef = useRef<HTMLUListElement>(null);
  const [alertsList, setAlertsList] = useState([] as AlertProps[]);
  const [alertUpdated, setAlertUpdated] = useState({} as AlertProps);
  const [currentAnimation, setCurrentAnimation] = useState(
    "default" as AlertAnimation
  );

  function generateUUID(): string {
    const hexDigits = "0123456789abcdef";
    let uuid = "";

    for (let i = 0; i < 32; i++) {
      const digit = Math.floor(Math.random() * 16);
      uuid += hexDigits[digit];
      if (i === 7 || i === 11 || i === 15 || i === 19) uuid += "-";
    }

    return uuid;
  }

  function handleAddRandomAlert() {
    const randomType = types[Math.floor(Math.random() * types.length)];
    const randomAlertId = generateUUID();
    const selectedType = alerts.find((alert) => alert.type === randomType);
    // const randomDate = generateRandomDate();

    const newAlert = {
      ...selectedType,
      id: randomAlertId,
      // date: randomDate,
    } as AlertProps;

    const sortedAlerts = [...alertsList, newAlert].sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    );

    setAlertsList(sortedAlerts);
  }

  function generateRandomDate(): Date {
    const startDate = new Date("2023-04-20T16:00:00.000Z");
    const endDate = new Date(Date.now());
    const timeDiff = endDate.getTime() - startDate.getTime();
    const randomTime =
      Math.floor(Math.random() * timeDiff) + startDate.getTime();
    return new Date(randomTime);
  }

  function removeElementFromArray(arr: any[], index: number): any[] {
    arr.splice(index, 1);
    return arr;
  }

  async function updateAnimation() {
    setCurrentAnimation("default");
  }

  async function addAlertUpdatedToArray(alert: AlertProps) {
    const newAlertsList = [...alertsList, alert];

    const sortedList = newAlertsList.sort((a, b) => {
      if (a.date > b.date) return -1;
      if (a.date < b.date) return 1;
      return 0;
    });
    setAlertsList(sortedList);
    setAlertUpdated({} as AlertProps);

    setTimeout(async () => {
      await updateAnimation();
    }, 250);
  }

  async function handleUpdateRandomALert() {
    const randomAlertIndex = Math.floor(Math.random() * alertsList.length);
    const randomAlert = alertsList[randomAlertIndex];
    const randomDate = generateRandomDate();

    const newAlert = {
      ...randomAlert,
      date: randomDate,
    };

    const newAlertsList = removeElementFromArray(alertsList, randomAlertIndex);

    const sortedList = newAlertsList.sort((a, b) => {
      if (a.date > b.date) return -1;
      if (a.date < b.date) return 1;
      return 0;
    });

    setAlertsList(sortedList);

    setAlertUpdated(newAlert);
    setCurrentAnimation("elevator");
    setTimeout(async () => {
      await addAlertUpdatedToArray(newAlert);
    }, 250);
  }

  function handleRemoveAlert(id: string) {
    const newAlertsList = alertsList.filter((alert) => alert.id !== id);
    setAlertsList(newAlertsList);
  }

  return (
    <main className="h-screen flex flex-col">
      <section className="flex flex-1">
        <Aside />
        <div className="flex flex-1 flex-col overflow-y-hidden">
          <Header />
          <Main>
            <h1 className="text-2xl text-center text-red-500 font-semibold">
              Alertas de Risco
            </h1>

            <ul
              className="top-0 right-1/2 translate-x-1/2 fixed flex flex-col gap-2 p-4"
              ref={ulRef}
            >
              {alertsList.map((alert) => (
                <Alert
                  fatherRef={ulRef}
                  key={alert.id}
                  id={alertUpdated.id === alert.id ? alert.id : ""}
                  title={alert.title}
                  message={alert.message}
                  type={alert.type}
                  date={alert.date}
                  animation={currentAnimation}
                  onRemove={() => handleRemoveAlert(alert.id as string)}
                />
              ))}
            </ul>

            <div className="flex justify-center ">
              <button
                className="fixed bottom-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
                onClick={handleAddRandomAlert}
              >
                Adicionar Alerta
              </button>

              <button
                className="fixed bottom-1 left-1/3 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
                onClick={handleUpdateRandomALert}
              >
                Atualizar alertas
              </button>
            </div>
          </Main>
        </div>
      </section>
      <Footer />
    </main>
  );
}
