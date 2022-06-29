import * as Yup from 'yup';
import { Box, Button, Group, PasswordInput, NumberInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';

const schema = Yup.object().shape({
  cardNumber: Yup.number(),
  expirationDate: Yup.string().email('Invalid email'),
  cvv: Yup.number().min(18, 'You must be at least 18 to create an account'),
});

function PaymentForm() {
  const form = useForm({
    schema: yupResolver(schema),
    initialValues: {
      cardNumber: null,
      expirationDate: false,
      cvv: 'secret',
      Amount: null,
    },

    validate: {
      cardNumber: null,
      expirationDate: false,
      cvv: 'secret',
      Amount: null,
    },
  });

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit(values => console.log(values))}>
        <NumberInput
          hideControls
          placeholder="Card number"
          label="Card number"
          {...form.getInputProps('Card number')}
          required
        />
        <NumberInput
          hideControls
          placeholder="MM/YYYY"
          label="Expiry date"
          inputFormat="MM/YYYY"
          labelFormat="MM/YYYY"
          required
        />
        <PasswordInput
          placeholder="CVV"
          label="CVV"
          {...form.getInputProps('CVV')}
          required
        />
        <NumberInput
          defaultValue={0}
          placeholder="Amount"
          label="Payment amount"
          parser={value => value.replace(/\$\s?|(,*)/g, '')}
          formatter={value =>
            !Number.isNaN(parseFloat(value))
              ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : '$ '
          }
        />
        <Group position="center" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}

export default PaymentForm;
