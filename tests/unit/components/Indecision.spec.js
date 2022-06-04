import { shallowMount } from "@vue/test-utils";
import Indecision from "@/components/Indecision"

describe("Indecision Component", () => {

  let wrapper
  let clgSpy

  global.fetch = jest.fn( () => Promise.resolve( {
    json: () => Promise.resolve({
      answer: "yes",
      forced: false,
      image: "https://yesno.wtf/assets/yes/2.gif"
    })
  }))

  beforeEach(() => {
    wrapper = shallowMount( Indecision );

    clgSpy = jest.spyOn( console, "log" )

    jest.clearAllMocks()

  })

  test("should match with snapshot", () => {
    expect( wrapper.html() ).toMatchSnapshot()
  })

  test("should not trigger when write in input (console.log)", async() => {
    const getAnswerSpy = jest.spyOn( wrapper.vm, "getAnswer" )

    const input = wrapper.find("input")
    await input.setValue("Hola Mundo")

    expect( clgSpy ).toHaveBeenCalledTimes(1)
    expect( getAnswerSpy ).not.toHaveBeenCalled()

    /* console.log(wrapper.vm) */

  })

  test("should trigger getAnswer when write '?' symbol", async() => {
    const getAnswerSpy = jest.spyOn( wrapper.vm, "getAnswer")

    const input = wrapper.find("input")
    await input.setValue("lloverá en Marinilla?")

    expect( clgSpy ).toHaveBeenCalledTimes(2)
    expect( getAnswerSpy ).toHaveBeenCalled()
  })

  test("getAnswer tests", async() => {
    await wrapper.vm.getAnswer()

    const img = wrapper.find("img")

    expect( img.exists() ).toBeTruthy()
    expect( wrapper.vm.img ).toBe("https://yesno.wtf/assets/yes/2.gif")
    expect( wrapper.vm.answer ).toBe("Si!")

  })

  test("should return no api response", async() => {
    global.fetch = jest.fn( () => Promise.resolve( {
      json: () => Promise.resolve({
        answer: "no",
        forced: false,
        image: "https://yesno.wtf/assets/yes/2.gif"
      })
    }))

    await wrapper.vm.getAnswer()
    const img = wrapper.find("img")
    expect( img.exists() ).toBeTruthy()
    expect( wrapper.vm.answer ).toBe("No!")
  })

  test("getAnswer tests - fail api", async() => {
    fetch.mockImplementationOnce( () => Promise.reject("API is down") )

    await wrapper.vm.getAnswer()

    const img = wrapper.find("img")

    expect( img.exists() ).toBeFalsy()
    expect( wrapper.vm.answer ).toBe("No se pudo cargar del API")
  })
})