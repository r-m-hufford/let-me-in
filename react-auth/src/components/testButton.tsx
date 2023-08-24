import { test } from "../api/auth";

const Test = () => {
  const handleTest = async () => {
    const result = await test()
    console.log({ result });
  }

  return (
    <div>
      <button onClick={handleTest}>
        test
      </button>
    </div>
  )
}

export default Test;