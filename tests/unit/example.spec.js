describe("Example Component", () => {
  test("Should be higher 10", () => {
    //Arrange Arreglar
    let value = 10;

    //Act Estímulo
    value = value + 2

    // Assert Observar el resultado
    expect( value ).toBeGreaterThan( 10 )
  })
})
